import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/database";
import userFactory from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY`;
});

describe('Testa a rota de cadastro POST /signup', () => {
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

describe("Testa a rota de login POST /login", () => {
  it("Deve receber um retornar status code 200 e um token", async () => {
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    delete user.confirmPassword;
    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body.token).not.toBeUndefined();
  });

  it("Deve retornar 401 ao enviar um usuário com credenciais inválidas", async () => {
    const randomUser = await userFactory();
    delete randomUser.confirmPassword;
    const result = await supertest(app).post("/login").send(randomUser);
    expect(result.status).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});