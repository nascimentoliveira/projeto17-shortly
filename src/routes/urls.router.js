import { Router } from 'express';

import { tokenValid } from '../middlewares/tokenValid.middleware.js';
import { getLinkById, redirectToLink, shorten } from '../controllers/urls.controller.js';
import { 
  shortUrlValid, 
  linkIdValid, 
  urlSchemaValid, 
  urlValid
} from '../middlewares/url.middleware.js';

export const urls = Router();

urls.post(
  '/urls/shorten',
  tokenValid,
  urlSchemaValid,
  urlValid,
  shorten
);

urls.get(
  '/urls/:id',
  linkIdValid,
  getLinkById
);

urls.get(
  '/urls/open/:shortUrl',
  shortUrlValid,
  redirectToLink
);

urls.delete(
  '/urls/:id'
);