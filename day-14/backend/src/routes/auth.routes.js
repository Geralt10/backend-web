import express from 'express';
import { RegisterUserController } from '../controllers/auth.controller.js';
import {body,validationResult} from 'express-validator'
import { registerValidation } from '../validation/auth.validator.js';
const authRouter = express.Router();


authRouter.post("/register",registerValidation,RegisterUserController)

export default authRouter;