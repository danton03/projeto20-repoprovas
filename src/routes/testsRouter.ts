import { Router } from "express";
import { createTest, listTestsByDiscipline } from "../controllers/testsController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { testSchema } from "../schemas/testSchema";
const testsRouter = Router();

testsRouter.post("/tests",validateSchemaMiddleware(testSchema), createTest);
testsRouter.get("/tests/disciplines", listTestsByDiscipline);

export default testsRouter;
