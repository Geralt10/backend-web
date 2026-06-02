const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"postID is required for create a like"]
    },
    user:{
        type:String,
        required:[true,"username is required for create a like"]
    },
    
},{timestamps:true});

likeSchema.index({post:1,user:1},{unique:true});

const likeModel = mongoose.model("likes",likeSchema);

module.exports=likeModel