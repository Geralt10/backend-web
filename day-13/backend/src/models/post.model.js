const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
        required:[true,"image or video is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user_id is required to create a post"]

    }

})

const postModel = mongoose.model("post",postSchema);

module.exports=postModel