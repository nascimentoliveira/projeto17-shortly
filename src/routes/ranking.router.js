import { Router } from 'express';
import { getRanking } from '../controllers/ranking.controller.js';

export const ranking = Router();

ranking.get(
  '/ranking',
  getRanking
);