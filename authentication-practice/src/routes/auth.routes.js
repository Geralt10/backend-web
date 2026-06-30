import express from 'express'
import { getMeController, refreshTokenController, registerController } from '../controllers/auth.controller.js';


const authRouter = express.Router();


authRouter.post("/register",registerController)
authRouter.get("/get-me",getMeController)
authRouter.post("/refresh-token",refreshTokenController)

export default authRouter