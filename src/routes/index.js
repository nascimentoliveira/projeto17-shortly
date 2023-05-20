import { Router } from "express";

import healthRouter from "./healthRouter.js";
import users from "./usersRouter.js";
import auth from "./authRouter.js";
import urls from "./urlsRouter.js";
import ranking from "./rankingRouter.js";
import { redirectToLink } from "../controllers/urls.controller.js";
import { shortUrlValid } from "../middlewares/url.middleware.js";

export const routers = Router();
routers
  .use("/", healthRouter)
  .use("/health", healthRouter)
  .use("/users", users)
  .use("/auth", auth)
  .use("/urls", urls)
  .use("/ranking", ranking)
  .get("/:shortUrl", shortUrlValid, redirectToLink);

export default routers;
//
