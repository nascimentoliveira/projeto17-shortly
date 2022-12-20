import { Router } from 'express';

import { tokenValid } from '../middlewares/tokenValid.middleware.js';
import {
  shorten,
  getLinkById, 
  redirectToLink, 
  deleteLink
} from '../controllers/urls.controller.js';

import { 
  urlSchemaValid,
  urlRegistered,
  urlValid,
  shortIdValid, 
  shortUrlValid, 
  urlUserValid
} from '../middlewares/url.middleware.js';

export const urls = Router();

urls.post(
  '/urls/shorten',
  tokenValid,
  urlSchemaValid,
  urlRegistered,
  urlValid,
  shorten
);

urls.get(
  '/urls/:id',
  shortIdValid,
  getLinkById
);

urls.get(
  '/urls/open/:shortUrl',
  shortUrlValid,
  redirectToLink
);

urls.delete(
  '/urls/:id',
  tokenValid,
  shortIdValid,
  urlUserValid,
  deleteLink
);