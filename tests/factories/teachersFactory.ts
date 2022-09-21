import { prisma } from "../../src/config/database";

export async function populateDb() {
  await prisma.terms.upsert({
    where: { id: 2 },
    update: { number: 2 },
    create: { number: 2 },
  });

  await prisma.categories.upsert({
    where: { name: "Projeto" },
    update: { name: "Projeto" },
    create: { name: "Projeto" },
  });

  await prisma.teachers.upsert({
    where: { name: "Diego Pinho" },
    update: { name: "Diego Pinho" },
    create: { name: "Diego Pinho" },
  });

  await prisma.teachersDisciplines.upsert({
    where: { id: 1 },
    update: { 
      disciplineId: 2,
      teacherId: 1, 
    },
    create: { 
      disciplineId: 2,
      teacherId: 1, 
    },
  });
}