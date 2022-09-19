import { findByName } from "../repositories/disciplinesRepository";

export async function findDisciplineByName(name: string){
  const result = await findByName(name)
  return result;
}