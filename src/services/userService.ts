import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findById, getUserByEmail, storeUser } from '../repositories/userRepository';
import bcrypt from "bcrypt";
import { TCreateUser } from '../types/authTypes';
import { conflictError, unauthorizedError } from '../utils/errorUtils';

dotenv.config();


export async function loginService(authData: TCreateUser) {
  // 1 - Verificar se o usuario existe no banco de dados
  const user = await getUserOrFail(authData.email);

  // 2 - Verificar se a senha dele esta correta
  const { password } = authData;
  const encyptedPassword = user.password;
  validatePassword(password, encyptedPassword);

  // 3 - Gerar token JWT
  const token = await generateToken(user.id);

  return token;
}

export async function createUserService(authData: TCreateUser) {
  // 1 - Verificar se o usuario jś existe no banco de dados
  const user = await getUserByEmail(authData.email);
  if(user){
    throw conflictError('E-mail already registered');
  }

  // 2 - Criptografar a senha
  const { password } = authData;
  const encryptedPassword = bcrypt.hashSync(password, 12);
  const userData = {
    ...authData,
    password: encryptedPassword
  }

  // 3 - Salvar no banco de dados
  await storeUser(userData)
}

export async function findUserById(id: number) {
  const user = await findById(id);
  return user;
}

export async function getUserOrFail(email: string) {
  const user = await getUserByEmail(email);
  if(!user){
    throw unauthorizedError('Invalid credentials');
  }

  return user;
}

async function validatePassword(password: string, encryptedPassword: string) {
  const comparePassword = bcrypt.compareSync(password, encryptedPassword);
  if (!comparePassword) {
    throw unauthorizedError('Invalid credentials');
  }
}

async function generateToken(userId: number) {
  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = { id: userId };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}