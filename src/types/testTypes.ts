import { Tests } from "@prisma/client"

export type TTest = Pick<Tests, "pdfUrl" | "name"> & {
  category: string;
  discipline: string;
  teacher: string;
};

export type TCreateTest = Omit<Tests, "id">