import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import health from "./health-router.js";
import users from "./users-router.js";
import auth from "./auth-router.js";
import urls from "./urls-router.js";
import ranking from "./ranking-router.js";
import swaggerSpec from "../docs.js";

const api = Router();
api
  .use("/", health)
  .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use("/health", health)
  .use("/users", users)
  .use("/auth", auth)
  .use("/urls", urls)
  .use("/ranking", ranking);

export default api;
//
