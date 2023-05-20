import { Router } from "express";

import { tokenValid } from "../middlewares/tokenValid.middleware.js";
import { shorten, deleteLink } from "../controllers/urls.controller.js";
import { getUserShortenedUrls } from "../controllers/users.controller.js";
import { urlSchemaValid, urlRegistered, urlValid, shortIdValid, urlUserValid } from "../middlewares/url.middleware.js";

export const urls = Router();

urls
  .all("/*", tokenValid)
  .post("/", urlSchemaValid, urlRegistered, urlValid, shorten)
  .get("/", getUserShortenedUrls)
  .delete("/:id", shortIdValid, urlUserValid, deleteLink);

export default urls;
//
