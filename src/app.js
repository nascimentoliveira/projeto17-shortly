import express from "express";
import cors from "cors";

import loadEnv from "./envs.js";
import routers from "./routes/index.js";

loadEnv();

export const app = express();
app.use(cors())
  .use(express.json())
  .use("/api", routers);

export default app;
//
