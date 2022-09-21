import { prisma } from '../src/config/database';

async function main() {
  await createTerms();
  await createCategories();
  await createTeachers();
  await createDisciplines();
  await createTeacherDisciplines();
}
//terms
export async function createTerms() {
  for (let i = 0; i <= 6; i++) {
    await prisma.terms.upsert({
      where: { id: i + 1 },
      update: { number: i + 1 },
      create: { number: i + 1 },
    });
  }
}

//categories
export async function createCategories() {
  let categories = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];
  
  for (let i = 0; i < categories.length; i++) {
    const name = categories[i];
    await prisma.categories.upsert({
      where: { id: i + 1 },
      update: name,
      create: name,
    });
  }  
}

//teachers
export async function createTeachers() {
  const teachers = [
    { name: "Diego Pinho" },
    { name: "Bruna Hamori" }
  ];
  
  for (let i = 0; i < teachers.length; i++) {
    const name = teachers[i];
    await prisma.teachers.upsert({
      where: { id: i + 1 },
      update: name,
      create: name,
    });
  }
}

//disciplines
export async function createDisciplines() {
  const disciplines = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ];
  
  for (let i = 0; i < disciplines.length; i++) {
    const disciplineData = disciplines[i];
    await prisma.disciplines.upsert({
      where: { id: i + 1 },
      update: disciplineData,
      create: disciplineData,
    });
  }
}

//teachersDiscipline
export async function createTeacherDisciplines() {
  const teachersDiscipline = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 3, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
  ];
  
  for (let i = 0; i < teachersDiscipline.length; i++) {
    const relationData = teachersDiscipline[i];
    await prisma.teachersDisciplines.upsert({
      where: { id: i + 1 },
      update: relationData,
      create: relationData,
    });
  }
}

main()
      .catch(e => {
        console.log(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
