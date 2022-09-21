import { Router } from "express";
import { createTest, listTestsByDiscipline, listTestsByTeachers } from "../controllers/testsController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { testSchema } from "../schemas/testSchema";
const testsRouter = Router();

testsRouter.post("/tests",validateSchemaMiddleware(testSchema), createTest);
testsRouter.get("/tests/disciplines", listTestsByDiscipline);
testsRouter.get("/tests/teachers", listTestsByTeachers);

export default testsRouter;
