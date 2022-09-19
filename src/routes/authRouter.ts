import { Router } from "express";
import { createUser, login } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { loginSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post('/login', validateSchemaMiddleware(loginSchema), login);
authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), createUser);

export default authRouter;
