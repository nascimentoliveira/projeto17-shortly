import { Router } from "express";

import rankingController from "../controllers/ranking-controller.js";

export const ranking = Router();

ranking.get("/", rankingController.getRanking);

export default ranking;
/**
 * @swagger
 * paths:
 *   /api/ranking:
 *     get:
 *       summary: Obter ranking de usuários
 *       tags:
 *         - Ranking
 *       description: Retorna o ranking de usuários com base no número de links e visitas.
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RankingResponse'
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 * components:
 *   schemas:
 *      RankingResponse:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: ID do usuário
 *            name:
 *              type: string
 *              description: Nome do usuário
 *            linksCount:
 *              type: string
 *              description: Número de links
 *            visitCount:
 *              type: string
 *              description: Número de visitas
 *      InternalSeverError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Ocorreu um erro interno no servidor. Tente novamente mais tarde.
 */
//
