/** @format */

const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});



async function createPostController(req, res) {
  console.log(req.body, req.file);
  
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
        message:"token not provided, unauthorized access",
    })
  }
   let decoded=null;
  try{
      decoded = jwt.verify(token,process.env.JWT_SECRET);
  }
  catch(err){
    return res.status(401).json({
        message:"unauthorized access"
    })
  }

  console.log(decoded);
  

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "userImage",
    folder:"instaClone"
  });
  
  const post = await postModel.create({
    caption:req.body.caption,
    img_url:file.url,
    user:decoded.id,
  })
   console.log(post);
   
  res.status(201).json({
      message:"post created",
      post
  })

}



async function getPostController(req,res){
   const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
        message:"token not provided, unauthorized access",
    })
  }
   
   let decoded;

   try {
     decoded= jwt.verify(token,process.env.JWT_SECRET);
   } catch (error) {
     return res.status(401).json({
        message:"unauthorized acess"
     })
   }

  
   const userID = decoded.id;
   const post = await postModel.find({
    user:userID
   });

   res.status(200).json({
     message:"post",
     post
   })

}

async function getpostDetailController(req,res){
    const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
        message:"token not provided, unauthorized access",
    })
  }

  let decoded;

  try {
    decoded = jwt.verify(token,process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
        message:"unauthorized access"
    })
  }

  const userID = decoded.id;
  const postID= req.params.postID;

  const post = await postModel.findById(postID);

  if(!post){
    return res.status(404).json({
        message:"post not found"
    })
  }

  const isValidUser = post.user.toString() == userID;
  
  if(!isValidUser){
    return res.status(403).json({
        message:"forbidden content"
    })
  }

  return res.status(200).json({
    message:"post fetched successfully",
    post
  })


}

module.exports = {createPostController,getPostController,getpostDetailController};
