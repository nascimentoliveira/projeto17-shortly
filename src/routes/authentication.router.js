import { Router } from 'express';

import { 
  authSchemaSignInValid, 
  authSchemaSignUpValid 
} from '../middlewares/authSchemaValid.middleware';

import { 
  authValidSignIn, 
  authValidSignUp 
} from '../middlewares/authValid.middleware';

import { signIn, signUp } from '../controllers/auth.controller';

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