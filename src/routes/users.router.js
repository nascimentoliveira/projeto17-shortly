import { Router } from 'express';

import { getUserShortenedUrls } from '../controllers/users.controller.js';
import { tokenValid } from '../middlewares/tokenValid.middleware.js';

export const users = Router();

users.get(
  '/users/me',
  tokenValid,
  getUserShortenedUrls
);