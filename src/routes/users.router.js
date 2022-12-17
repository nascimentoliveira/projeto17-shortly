import { Router } from 'express';

export const users = Router();

users.get(
  '/users/me'
);