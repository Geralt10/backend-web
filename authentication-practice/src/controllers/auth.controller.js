import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js";


export async function registerController(req,res){
    const{username,email,password}=req.body;
    console.log(req.body);
    
    const isAlreadyExist = await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isAlreadyExist){
        return res.status(409).json({
            message:"user already exist with this username or email"
        })
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    const accessToken = jwt.sign({
        id:user._id
    },config.JWT_SECRET,{expiresIn:"15m"});


    const refreshToken = jwt.sign({
        id:user._id
    },config.JWT_SECRET,{expiresIn:"7d"});



    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    });
    
    res.status(201).json({
        message:"user registered",
        user:{
            username:user.username,
            email:user.email
        },
        accessToken
    })
}



export async function getMeController(req,res) {
    const token =  req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        console.log(decoded.id);
        
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.status(200).json({
            user:{
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        res.status(401).json({
            message:"invalid token"
        })
    }
}


export async function refreshTokenController(req,res) {
    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message:"invalid token"
        })
    }

    const decoded = jwt.verify(refreshToken,config.JWT_SECRET);

    const accessToken = jwt.sign({
        id:decoded.id
    },config.JWT_SECRET,{expiresIn:'15m'});

    const newRefreshToken = jwt.sign({
        id:decoded.id
    },config.JWT_SECRET,{expiresIn:'7d'});

    res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    });

    

    res.status(201).json({
        message:"token refreshed",
        accessToken
    })
}

