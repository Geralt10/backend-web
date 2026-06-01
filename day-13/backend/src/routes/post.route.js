const express = require("express");

const postRouter = express.Router();
const { createPostController, getPostController, getpostDetailController } = require("../controller/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/auth.middleware");
const upload = multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),identifyUser,createPostController);

postRouter.get("/",identifyUser,getPostController);

postRouter.get("/detail/:postID",identifyUser,getpostDetailController);

module.exports=postRouter