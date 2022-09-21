import { Request, Response } from "express";
import { createTestService, findTestsByDiscipline } from "../services/testsService";
import { TTest } from "../types/testTypes";


export async function createTest(req:Request, res:Response) {
  const testData : TTest = req.body;
  await createTestService(testData);
  res.sendStatus(201);
}

export async function listTestsByDiscipline(req: Request, res: Response) {
  const tests = await findTestsByDiscipline();
  res.status(200).send(tests);
}