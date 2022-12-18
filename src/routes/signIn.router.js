import { Router } from 'express';

import { signInSchemaValid, signInValid } from '../middlewares/signIn.middleware.js';
import { postSignIn } from '../controllers/signIn.controller.js';

export const signIn = Router();

signIn.post(
  '/signin',
  signInSchemaValid,
  signInValid,
  postSignIn
);