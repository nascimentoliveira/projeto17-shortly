import { Router } from 'express';

import { 
  authSchemaSignInValid, 
  authSchemaSignUpValid 
} from '../middlewares/authSchemaValid.middleware.js';

import { 
  authValidSignIn, 
  authValidSignUp 
} from '../middlewares/authValid.middleware.js';

import { signIn, signUp } from '../controllers/auth.controller.js';

export const authentication = Router();

authentication.post(
  '/signin',
  authSchemaSignInValid,
  authValidSignIn,
  signIn
);

authentication.post(
  '/signup',
  authSchemaSignUpValid,
  authValidSignUp,
  signUp
);