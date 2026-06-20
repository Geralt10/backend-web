const express = require('express');
const { followUserController, unfollowUserController, acceptFollowRequestController, rejectFollowRequestController, updatePrivacyController } = require('../controller/follow.controller');
const { getProfileController, updateProfileController, getFollowRequestsController } = require('../controller/user.controller');
const identifyUser = require('../middleware/auth.middleware');
const multer = require("multer");

const userRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.post("/follow/:username",identifyUser,followUserController);
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController);
userRouter.post("/follow/:username/accept",identifyUser,acceptFollowRequestController);
userRouter.post("/follow/:username/reject",identifyUser,rejectFollowRequestController);
userRouter.get("/follow-requests",identifyUser,getFollowRequestsController);
userRouter.patch("/privacy",identifyUser,updatePrivacyController);
userRouter.get("/profile/:username",identifyUser,getProfileController);
userRouter.patch("/profile",identifyUser,upload.single("profileImage"),updateProfileController);

module.exports=userRouter
