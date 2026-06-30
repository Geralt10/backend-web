import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB()

app.listen(3000,()=>{
    console.log("app is running at port 3000")
})