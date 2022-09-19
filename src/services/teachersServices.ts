import { findByName, findTeacherDisciplineByIds } from "../repositories/teachersRepository"

export async function findTeacherByName(name: string){
  const result = await findByName(name)
  return result;
}

export async function findTeacherDiscipline(disciplineId: number, teacherId: number){
  const result = await findTeacherDisciplineByIds(disciplineId, teacherId)
  return result;
}