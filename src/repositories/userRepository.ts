import { prisma } from "../config/database";
import { TUser, TCreateUser } from "../types/authTypes";

export async function storeUser(userData: TCreateUser) {
  await prisma.users.create({
    data: userData
  });
}

export async function getUserByEmail(userEmail: string): Promise<TUser>{
  const user = await prisma.users.findUnique({
    where: { email: userEmail }
  });
  return user;
}

export async function findById(id: number) {
  return prisma.users.findUnique({
    where: { id }
  });
}