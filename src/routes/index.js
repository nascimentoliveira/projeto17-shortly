import { Router } from 'express';

import { signIn } from './signIn.router.js';
import { signUp } from './signUp.router.js';
import { urls } from './urls.router.js';
import { users } from './users.router.js';
import { ranking } from './ranking.router.js';

export const router = Router();
router.use(signIn);
router.use(signUp);
router.use(urls);
router.use(users);
router.use(ranking);