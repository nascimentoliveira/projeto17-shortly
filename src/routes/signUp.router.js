import { Router } from 'express';

import { signUpSchemaValid, signUpValid } from '../middlewares/signUp.middleware.js';
import { postSignUp } from '../controllers/signUp.controller.js';

export const signUp = Router();

signUp.post(
  '/signup',
  signUpSchemaValid,
  signUpValid,
  postSignUp
);