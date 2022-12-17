import { Router } from 'express';

export const authentication = Router();

authentication.post(
  '/signin'
);

authentication.post(
  '/signup'
);