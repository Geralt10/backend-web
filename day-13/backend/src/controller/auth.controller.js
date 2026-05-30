const userModel =require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");



async function registerController(req,res){
    const {username,email,password,bio,profileImage}=req.body;
    
    const isUserExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });
   
    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"+(isUserExists.email==email ? "email already exists":"username already exists")
        })
    }

    const user = await userModel.create({
        username,
        email,
        password:crypto.createHash("md5").update(password).digest("hex"),
        bio,
        profileImage,
    });

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1hr"});

    res.cookie("token",token);

   res.status(200).json({
    "message":"registered",
    user:{
    "username":user.username,
    "email":user.email,
    "bio":user.bio,
    "profileImage":user.profileImage,
    }
   })
}





async function loginController(req,res){
    const{username,email,password}=req.body;
    
    const user = await userModel.findOne({
        $or:[
            {
              username:username
            },
            {
              email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const passwordMatch = user.password == crypto.createHash("md5").update(password).digest("hex");

    if(!passwordMatch){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1hr"});

    res.cookie("token",token);

    res.status(200).json({
        message:"loggedIn",
        user:{
              username:username,
              email:user.email,
              bio:user.bio,
              profileImage:user.profileImage
        }
    })


}


module.exports={
    registerController,
    loginController
}