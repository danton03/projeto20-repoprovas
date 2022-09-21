import { getTestsByDiscipline, insertTest } from "../repositories/testsRepository";
import { TCreateTest, TTest } from "../types/testTypes";
import { notFoundError } from "../utils/errorUtils";
import * as categoriesService from "./categoriesService";
import * as teacherService from "./teachersServices";
import * as disciplineService from "./disciplineService";

export async function createTestService(testData: TTest){
  const category = await categoriesService.findCategory(testData.category);
  if(!category){
    throw notFoundError("Category not found");
  }

  const teacher = await teacherService.findTeacherByName(testData.teacher);
  if(!teacher){
    throw notFoundError("Teacher not found");
  }

  const discipline = await disciplineService.findDisciplineByName(testData.discipline);
  if(!discipline){
    throw notFoundError("Discipline not found");
  }

  const teacherDiscipline = await teacherService.findTeacherDiscipline(discipline.id, teacher.id);
  if(!teacherDiscipline){
    throw notFoundError("Teacher discipline not found");
  }

  const createTestData: TCreateTest = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id
  }
  await insertTest(createTestData);
}

export async function findTestsByDiscipline() {
  return await getTestsByDiscipline();
}