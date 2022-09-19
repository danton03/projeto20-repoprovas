import { findByName } from "../repositories/categoriesRepository";

export async function findCategory(name: string){
  const category = await findByName(name);
  return category;
 }