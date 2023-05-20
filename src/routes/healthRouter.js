import { Router } from "express";

import { checkDatabaseConnection } from "../database/database.js";

export const healthRouter = Router();

healthRouter
  .get("/", async (req, res) => {
    const databaseStatus = await checkDatabaseConnection();
    const isHealthy = (databaseStatus === "connected");
    res.status(isHealthy ? 200 : 500).send({
      description: "API Shortly",
      status: isHealthy ? "healthy" : "unhealthy",
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    });
  });

export default healthRouter;
//
