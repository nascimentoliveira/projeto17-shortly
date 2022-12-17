import { Router } from 'express';

export const urls = Router();

urls.get(
  '/urls/:id'
);

urls.get(
  '/urls/open/:shortUrl'
);

urls.delete(
  '/urls/:id'
);