import supertest from "supertest";
import { createCategories, createDisciplines, createTeacherDisciplines, createTeachers, createTerms } from "../prisma/seed";
import app from "../src/app";
import { prisma } from "../src/config/database";
import { populateDb } from "./factories/teachersFactory";
import testsFactory from "./factories/testFactory";
import userFactory from "./factories/userFactory";

beforeEach(async () => {
  prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE terms CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE`;

  prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE disciplines RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE terms RESTART IDENTITY`;
  prisma.$executeRaw`TRUNCATE TABLE teachers RESTART IDENTITY`
  await populateDb();
});

describe("Testa a rota de criar provas POST /tests", () => {
  it("Deve criar a prova e retornar 201", async () => {
    const token = await generateToken();
    const test = testsFactory();
    const result = await supertest(app)
      .post("/tests")
      .set("Authorization", token)
      .send(test);
    expect(result.status).toEqual(201);
  });

  it("Deve retornar 404 ao receber um valor não cadastrado em disciplina ou categoria", async () => {
    const token = await generateToken();

    const test = testsFactory();
    test.discipline = "test";

    const result = await supertest(app)
      .post("/tests")
      .set("Authorization", token)
      .send(test);

    expect(result.status).toEqual(404);
  });
});


async function generateToken() {
  const user =  await userFactory();
  await supertest(app).post("/signup").send(user);

  delete user.confirmPassword;
  const login = await supertest(app).post("/login").send(user);

  const token = `Bearer ${login.body.token}`;
  return token;
}

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testa a listagem de provas por disciplina GET /tests/disciplines", () => {
  it("Deve receber um array com as provas e status 200", async () => {
    const token = await generateToken();
    const result = await supertest(app).get("/tests/disciplines").set("Authorization", token);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).not.toEqual(0);
  });

  it("Deve receber status 401 ao acessar a rota sem enviar o token", async () => {
    const result = await supertest(app).get("/tests/disciplines");
    expect(result.status).toEqual(401);
  });

  it("Deve receber status 401 ao acessar a rota com um token inválido", async () => {
    const token = "eyJhbGciOiSCUzI1NiIsInR5cCI6IkpXVCJ9.dc45ZCI6MSwiaWF0IjoxNjYyOTIyMj9cLCJleHAiOjE2NjMwMDg2NTF9.m0jwnkA8kPfHhYmj7x51vQsi36UsZxcxCFpecWoDc50"
    const result = await supertest(app).get("/tests/disciplines").set("Authorization", token);
    expect(result.status).toEqual(401);
  });
});
