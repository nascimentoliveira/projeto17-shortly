import { Router } from "express";

import { checkDatabaseConnection } from "../database/database.js";

const health = Router();

health
  .get("/", async (req, res) => {
    const databaseStatus = await checkDatabaseConnection();
    const isHealthy = (databaseStatus === "connected");
    res.status(isHealthy ? 200 : 500).send({
      description: "Shortly-API",
      status: isHealthy ? "healthy" : "unhealthy",
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    });
  });

export default health;
/**
 * @swagger
 * paths:
 *   /api/health:
 *     get:
 *       summary: Verificar o status da API.
 *       tags:
 *         - Health
 *       description: Verifica se a API está em execução e o banco de dados está conectado.
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/HealthResponse'
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 * components:
 *   schemas:
 *      HealthResponse:
 *        type: object
 *        properties:
 *          description:
 *            type: string
 *            description: Descrição do status da saúde
 *          status:
 *            type: string
 *            description: Status da saúde do servidor
 *          database:
 *            type: string
 *            description: Status da conexão com o banco de dados
 *          timestamp:
 *            type: string
 *            format: date-time
 *            description: Timestamp da resposta
 *      InternalSeverError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Ocorreu um erro interno no servidor. Tente novamente mais tarde.
 */
//
