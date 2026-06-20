/** @format */

const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const { uploadBufferFile } = require("../utils/imagekit");
const { canAccessUserContent, attachFeedMeta } = require("../utils/social");



async function createPostController(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "image is required",
    });
  }
  
  const file = await uploadBufferFile(req.file.buffer, "userImage", "instaClone/posts");
  
  const post = await postModel.create({
    caption:req.body.caption,
    img_url:file.url,
    user:req.user.id,
  })
  res.status(201).json({
      message:"post created",
      post
  })

}



async function getPostController(req,res){
   

  
   const userID = req.user.id;
   const post = await postModel.find({
    user:userID
   });

   res.status(200).json({
     message:"post",
     post
   })

}



async function getpostDetailController(req,res){
   

  const userID = req.user.id;
  const postID= req.params.postID;

  const post = await postModel.findById(postID).populate("user").lean();

  if(!post){
    return res.status(404).json({
        message:"post not found"
    })
  }

  const canViewPost = await canAccessUserContent(req.user.username, post.user);

  if(!canViewPost){
    return res.status(403).json({
        message:"forbidden content"
    })
  }

  return res.status(200).json({
    message:"post fetched successfully",
    post:(await attachFeedMeta([post], req.user.username))[0]
  })


}


async function likePostController(req,res) {
   const username = req.user.username;
   const postID = req.params.postID;

   const post = await postModel.findById(postID);

   if(!post){
    return res.status(404).json(
      {
        message:"post not found"
      }
    )
   }

   const postOwner = await userModel.findById(post.user);
   const canViewPost = await canAccessUserContent(username, postOwner);

   if (!canViewPost) {
    return res.status(403).json({
      message:"you cannot like this private post"
    })
   }

   try{
    const likePost = await likeModel.create({
      post:post._id,
      user:username
   })

   res.status(201).json({
    message:"you liked this post",
    likePost
   })
   }
   catch(err){
     if(err.code===11000){
      return res.status(409).json({
           message:"Already liked"
     })
     }
     return res.status(500).json({
      message:"server error"
     })
   }

}

async function unlikePostController(req,res){
  const username = req.user.username;
   const postID = req.params.postID;

   const post = await postModel.findById(postID);

   if(!post){
    return res.status(404).json(
      {
        message:"post not found"
      }
    )
   }
   const postOwner = await userModel.findById(post.user);
   const canViewPost = await canAccessUserContent(username, postOwner);

   if (!canViewPost) {
    return res.status(403).json({
      message:"you cannot unlike this private post"
    })
   }

   try {
    const isAlreadyLiked = await likeModel.findOne({
      post: postID,
      user: username
    });

    if(!isAlreadyLiked){
      return res.status(404).json({
        message: "You haven't liked this post"
      })
    }

    await likeModel.findByIdAndDelete(isAlreadyLiked._id);
     res.status(200).json({
     message:"you unliked this post",
   })

   } 
   catch (error) {
      if(error.code===11000){
      return res.status(409).json({
           message:"Already unliked"
     })
     }
     return res.status(500).json({
      message:"server error"
     })
   }

   
  
}

async function getFeedController(req,res) {
   const user = req.user
   const acceptedFollows = await followModel.find({
    follower: user.username,
    status: "accepted"
   }).lean();

   const followedUsernames = acceptedFollows.map((follow) => follow.following);
   const visibleUsers = await userModel.find({
    $or: [
      { isPrivate: false },
      { username: user.username },
      { username: { $in: followedUsernames } },
    ],
   }).select("_id").lean();

    const posts = await attachFeedMeta(
      await postModel
        .find({ user: { $in: visibleUsers.map((visibleUser) => visibleUser._id) } })
        .sort({ _id: -1 })
        .populate("user")
        .lean(),
      user.username
    );

    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}

module.exports = {createPostController,getPostController,getpostDetailController,likePostController,unlikePostController,getFeedController};
