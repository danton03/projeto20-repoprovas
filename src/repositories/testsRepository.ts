import { prisma } from "../config/database";
import { TCreateTest } from "../types/testTypes";

export async function insertTest(testData: TCreateTest) {
  await prisma.tests.create({ data: testData });
}