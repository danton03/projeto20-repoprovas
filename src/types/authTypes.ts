import { Users } from '@prisma/client';

export type TCreateUser = Omit<Users, 'id'>;
export type TUser = Users;