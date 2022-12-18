import joi from 'joi';

export const authSchemaSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

export const authSchemaSignUp = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});