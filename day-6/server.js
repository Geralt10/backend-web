const app = require("./src/app");

const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect("mongodb+srv://geralt:geralt%407895@cluster0.gcwcarn.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to database");
        
    })
}

connectToDB()

app.listen(3000,()=>{
    console.log("server is running at port 3000");
    
})