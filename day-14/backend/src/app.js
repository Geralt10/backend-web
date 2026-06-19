import express from "express"
import authRouter from "./routes/auth.routes.js";
import errorHandle from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());


app.use("/api/auth",authRouter)

app.use(errorHandle)

export default app;