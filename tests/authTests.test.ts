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
    const result =  await supertest(app).post('/signup').send(user);
    expect(result.status).toEqual(201);
  });

  it('Deve impedir o cadastro do mesmo usuário mais de uma vez', async () => {
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signup").send(user);
    expect(result.status).toEqual(409);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});