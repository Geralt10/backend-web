const express = require("express");
const cors = require("cors")

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     credentials:true,
     origin:["http://localhost:5173", "http://localhost:5174"]
}))


const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");


app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/user",userRouter);


module.exports=app