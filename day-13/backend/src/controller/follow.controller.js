const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req,res) {
    const followerUsername = req.user.username;
    const followingUsername= req.params.username;
    

    const isFollowingExists = await userModel.findOne({
        username:followingUsername
    });

    if(!isFollowingExists){
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    
    const alreadyFollowed = await followModel.findOne({
        follower:followerUsername,
        following:followingUsername
    })

    if(alreadyFollowed){
        return res.status(409).json({
            message:"you already follow this user",
            follow:alreadyFollowed
        })
    }


    
    const followRecord = await followModel.create({
        follower:followerUsername,
        following:followingUsername
    })
    
    res.status(201).json({
        message:`you are now following ${followingUsername}`,
        follow:followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username;
    const followingUsername= req.params.username;

    const isFollowingExists = await userModel.findOne({
        username:followingUsername
    });

    if(!isFollowingExists){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const isFollowing = await followModel.findOne({
        follower:followerUsername,
        following:followingUsername
    })

    if(!isFollowing){
        return res.status(409).json({
            message:"you did not follow this user",
        })
    }
    await followModel.findByIdAndDelete(isFollowing._id);
    res.status(200).json({
        message:"you have unfollowed this user"
    })
}

module.exports={followUserController,unfollowUserController}