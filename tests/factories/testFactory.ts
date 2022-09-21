import { faker } from "@faker-js/faker";

export default function testsFactory() {
  const teacher = "Diego Pinho"
  const teacherDiscipline = "JavaScript"
  const category = "Projeto"

  const test = {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    discipline: teacherDiscipline,
    category,
    teacher 
  };

  return test;
}