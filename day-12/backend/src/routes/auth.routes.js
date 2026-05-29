const express = require("express");
const jwt= require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();


const userModel = require("../models/user.model")

authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const isEmailAlreadyExists = await userModel.findOne({email});
    if(isEmailAlreadyExists){
        return res.status(409).json({
            message:"email already exists",
        })
    };
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
        name,
        email,
        password:hash,
    })
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1hr"});

    res.cookie("token",token);
    
    res.status(201).json({
        message:"user registered",
        user:{
            name:user.name,
            email:user.email
        }
    })
    
})

authRouter.get("/get-me",async(req,res)=>{
    const token = req.cookies.token;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.json({
        name:user.name,
        email:user.email,
    })
})

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"user not found",
        })
    }

    const passwordMatch= user.password = crypto.createHash("md5").update(password).digest("hex");
    
    if(!passwordMatch){
        return res.status(401).json({
            message:"invalid password",
        })
    }
    
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1hr"});

    res.cookie("token",token);

    res.status(200).json({
        name:user.name,
        email:user.email
    })
})

module.exports=authRouter