import { Router } from 'express';

import { tokenValid } from '../middlewares/tokenValid.middleware.js';
import { urlSchemaValid, urlValid } from '../middlewares/url.middleware.js';
import { shorten } from '../controllers/urls.controller.js';

export const urls = Router();

urls.post(
  '/urls/shorten',
  tokenValid,
  urlSchemaValid,
  urlValid,
  shorten
);

urls.get(
  '/urls/:id'
);

urls.get(
  '/urls/open/:shortUrl'
);

urls.delete(
  '/urls/:id'
);