import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/database";
import userFactory from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY`;
});

describe('Testa a função de cadastro POST /signup', () => {
  it('Deve cadastrar o usuário com sucesso', async () => {
    const user = await userFactory();
    const restult =  await supertest(app).post('/signup').send(user);
    expect(restult.status).toEqual(201);
  });

  it.todo('Deve impedir o cadastro do mesmo usuário mais de uma vez');
});

afterAll(async () => {
  await prisma.$disconnect();
});