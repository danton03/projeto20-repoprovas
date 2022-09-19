import { prisma } from "../config/database";

export async function findByName(name: string) {
  return await prisma.disciplines.findUnique({ where: { name } });
}
