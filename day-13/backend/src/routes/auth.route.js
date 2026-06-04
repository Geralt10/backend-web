const express = require("express");
const {registerController,loginController, getMeController}= require("../controller/auth.controller")
const authRouter = express.Router();

const identifyUser = require("../middleware/auth.middleware")

authRouter.post("/register",registerController)



authRouter.post("/login",loginController)

authRouter.get("/get-me",identifyUser,getMeController)


module.exports=authRouter