import { Router } from "express";
import { createTest } from "../controllers/testsController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { testSchema } from "../schemas/testSchema";
const testsRouter = Router();

testsRouter.post("/tests",validateSchemaMiddleware(testSchema), createTest);

export default testsRouter;
