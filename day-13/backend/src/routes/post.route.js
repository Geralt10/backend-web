const express = require("express");

const postRouter = express.Router();
const { createPostController, getPostController, getpostDetailController } = require("../controller/post.controller");

const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),createPostController);

postRouter.get("/",getPostController);

postRouter.get("/detail/:postID",getpostDetailController);

module.exports=postRouter