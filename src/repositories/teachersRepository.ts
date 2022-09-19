import { prisma } from "../config/database";

export async function findByName(name: string) {
  return await prisma.teachers.findUnique({ where: { name } });
}

export async function findTeacherDisciplineByIds(disciplineId: number, teacherId: number) {
  return await prisma.teachersDisciplines.findFirst({ 
    where: {
      disciplineId, 
      teacherId
    } 
  });
}
