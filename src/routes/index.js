import { Router } from "express";

import users from "./usersRouter.js";
import auth from "./authRouter.js";
import urls from "./urlsRouter.js";
import ranking from "./rankingRouter.js";

export const routers = Router();
routers
  .use(users)
  .use(auth)
  .use(urls)
  .use(ranking);

export default routers;
//
