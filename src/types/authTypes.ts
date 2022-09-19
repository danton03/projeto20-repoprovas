import { Users } from '@prisma/client';

export type TCreateUser = Omit<Users, 'id'>;
export type TUserReq = Omit<Users, 'id'> & {
  confirmPassword: string
};
export type TUser = Users;