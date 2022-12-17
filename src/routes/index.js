import { Router } from 'express';

import { authentication } from './authentication.router.js';
import { urls } from './urls.router.js';
import { users } from './users.router.js';
import { ranking } from './ranking.router.js';

export const router = Router();
router.use(authentication);
router.use(urls);
router.use(users);
router.use(ranking);