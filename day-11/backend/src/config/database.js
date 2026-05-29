const mongoose = require("mongoose");

function ConnectDb() {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("database connected");
      
    })
}

module.exports=ConnectDb