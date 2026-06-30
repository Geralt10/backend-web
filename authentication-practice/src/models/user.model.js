import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is requried"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel