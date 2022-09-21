import supertest from "supertest";
import { createCategories, createDisciplines, createTeacherDisciplines, createTeachers, createTerms } from "../prisma/seed";
import app from "../src/app";
import { prisma } from "../src/config/database";
import { populateDb } from "./factories/teachersFactory";
import testsFactory from "./factories/testFactory";
import userFactory from "./factories/userFactory";

beforeEach(async () => {
  prisma.$executeRaw`TRUNCATE TABLE users`;
  prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE terms CASCADE`;
  prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE`
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
    console.log(result.body);
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