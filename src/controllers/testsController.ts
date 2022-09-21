import { Request, Response } from "express";
import { createTestService, findTestsByDiscipline, findTestsByTeachers } from "../services/testsService";
import { TTest } from "../types/testTypes";


export async function createTest(req:Request, res:Response) {
  const testData : TTest = req.body;
  await createTestService(testData);
  res.sendStatus(201);
}

export async function listTestsByDiscipline(req: Request, res: Response) {
  const testsList = await findTestsByDiscipline();
  res.status(200).send(testsList);
}

export async function listTestsByTeachers(req: Request, res: Response) {
  const testsList = await findTestsByTeachers();
  res.status(200).send(testsList);
}