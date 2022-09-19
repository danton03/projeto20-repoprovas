import { Request, Response } from "express";
import { createTestService } from "../services/testsService";
import { TTest } from "../types/testTypes";


export async function createTest(req:Request, res:Response) {
  const testData : TTest = req.body;
  await createTestService(testData);
  res.sendStatus(201);
}