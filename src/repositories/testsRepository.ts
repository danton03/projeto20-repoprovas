import { prisma } from "../config/database";
import { TCreateTest } from "../types/testTypes";

export async function insertTest(testData: TCreateTest) {
  await prisma.tests.create({ data: testData });
}

export async function getTestsByDiscipline() {
  const testsList = await prisma.terms.findMany({
    where: {},
    distinct: ["number"],
    select: {
      number: true,
      Disciplines: {
        distinct: ["name"],
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              teacher: { select: { name: true } },
              Tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return testsList;
}

export async function getTestsByTeachers() {
  const testsList = await prisma.teachers.findMany({
    where: {},
    distinct: ["name"],
    select: {
      name: true,
      teachersDisciplines: {
        select: {
          discipline: { select: { name: true } },
          Tests: {
            select: {
              name: true,
              pdfUrl: true,
              category: { select: { name: true } },
            },
            orderBy: { categoryId: "desc" },
          },
        },
      },
    },
  });

  return testsList;
}