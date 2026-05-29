require("dotenv").config()

const app = require("./src/app");

const ConnectDb=require("./src/config/database");

ConnectDb()

app.listen(3000,()=>{
    console.log("sever is running on port 3000")
})