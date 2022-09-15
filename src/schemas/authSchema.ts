import joi from 'joi';

export const authSchema = joi.object({
  email: joi.string().email().required(), 
  password: joi.string().trim().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
});
