import express from "express";
import cors from "cors";

import loadEnv from "./envs.js";
import healthRouter from "./routes/healthRouter.js";
import routers from "./routes/index.js";

loadEnv();

export const app = express();
app.use(cors())
  .use(express.json())
  .get("*", healthRouter)
  .use("/api", routers);

export default app;
//
