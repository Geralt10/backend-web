const express = require('express');
const { followUserController, unfollowUserController, acceptFollowRequestController, rejectFollowRequestController, updatePrivacyController } = require('../controller/follow.controller');
const identifyUser = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post("/follow/:username",identifyUser,followUserController);
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController);
userRouter.post("/follow/:username/accept",identifyUser,acceptFollowRequestController);
userRouter.post("/follow/:username/reject",identifyUser,rejectFollowRequestController);
userRouter.patch("/privacy",identifyUser,updatePrivacyController);

module.exports=userRouter