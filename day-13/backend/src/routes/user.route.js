const express = require('express');
const { followUserController, unfollowUserController } = require('../controller/follow.controller');
const identifyUser = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post("/follow/:username",identifyUser,followUserController);
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController)

module.exports=userRouter