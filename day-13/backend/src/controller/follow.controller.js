const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req,res) {
    const followerUsername = req.user.username;
    const followingUsername= req.params.username;

    if (followerUsername === followingUsername) {
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }

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
        if (alreadyFollowed.status === "accepted") {
            return res.status(409).json({
                message:"you already follow this user",
                follow:alreadyFollowed
            })
        }

        if (alreadyFollowed.status === "pending") {
            return res.status(409).json({
                message:"follow request already sent",
                follow:alreadyFollowed
            })
        }

        alreadyFollowed.status = isFollowingExists.isPrivate ? "pending" : "accepted";
        await alreadyFollowed.save();

        return res.status(200).json({
            message:isFollowingExists.isPrivate ? `follow request sent to ${followingUsername}` : `you are now following ${followingUsername}`,
            follow:alreadyFollowed
        })
    }

    const followStatus = isFollowingExists.isPrivate ? "pending" : "accepted";
    const followRecord = await followModel.create({
        follower:followerUsername,
        following:followingUsername,
        status:followStatus
    })

    const message = isFollowingExists.isPrivate
        ? `follow request sent to ${followingUsername}`
        : `you are now following ${followingUsername}`;
    
    res.status(201).json({
        message,
        follow:followRecord
    })
}

async function acceptFollowRequestController(req,res) {
    const accountUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower:followerUsername,
        following:accountUsername
    });

    if(!followRequest){
        return res.status(404).json({
            message:"follow request not found"
        })
    }

    if(followRequest.status !== "pending"){
        return res.status(409).json({
            message:"follow request is not pending",
            follow:followRequest
        })
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
        message:`follow request from ${followerUsername} accepted`,
        follow:followRequest
    })
}

async function rejectFollowRequestController(req,res) {
    const accountUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower:followerUsername,
        following:accountUsername
    });

    if(!followRequest){
        return res.status(404).json({
            message:"follow request not found"
        })
    }

    if(followRequest.status !== "pending"){
        return res.status(409).json({
            message:"follow request is not pending",
            follow:followRequest
        })
    }

    followRequest.status = "rejected";
    await followRequest.save();

    res.status(200).json({
        message:`follow request from ${followerUsername} rejected`,
        follow:followRequest
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

async function updatePrivacyController(req,res) {
    const username = req.user.username;
    const {isPrivate} = req.body;

    if(typeof isPrivate !== "boolean"){
        return res.status(400).json({
            message:"isPrivate must be a boolean value"
        })
    }

    const user = await userModel.findOneAndUpdate(
        {username},
        {isPrivate},
        {new:true}
    );

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if (!isPrivate) {
        await followModel.updateMany(
            { following: username, status: "pending" },
            { status: "accepted" }
        );
    }

    res.status(200).json({
        message:isPrivate ? "account set to private" : "account set to public",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage,
            isPrivate:user.isPrivate
        }
    })
}

module.exports={
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    updatePrivacyController
}
