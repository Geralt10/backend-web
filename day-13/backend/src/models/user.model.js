const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is already exists"],
        required:[true,"username cannot be empty"]
    },
    email:{
        type:String,
        unique:[true,"email is already exists"],
        required:[true,"email cannot be empty"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/geralt7895/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    isPrivate:{
        type:Boolean,
        default:false
    }
});

const userModel = mongoose.model("users",userSchema);

module.exports=userModel