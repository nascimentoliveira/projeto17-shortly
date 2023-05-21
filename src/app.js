import express from "express";
import cors from "cors";

import loadEnv from "./envs.js";
import routers from "./routes/index.js";
import redirect from "./routes/redirect-router.js";

loadEnv();

export const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/api", routers)
  .use("/", redirect);

export default app;
//
