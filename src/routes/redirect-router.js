import { Router } from "express";

import urlsController from "../controllers/urls-controller.js";
import urlsMiddleware from "../middlewares/urls-middleware.js";

export const redirect = Router();

redirect
  .get("/:shortURL", urlsMiddleware.shortURLValid, urlsController.redirectToBigURL);

export default redirect;
/**
 * @swagger
 * paths:
 *   /:
 *     get:
 *       summary: Redirecionamento
 *       tags:
 *         - Redirecionamento
 *       parameters:
 *         - name: shortURL
 *           in: path
 *           description: Identificador do link encurtado
 *           required: true
 *           schema:
 *             type: string
 *             example: eXampI_e
 *       description: Retorna todas as URLs que o usuário encurtou.
 *       responses:
 *         '404':
 *           description: Link não encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/NotFoundError'
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Token de acesso ausente ou inválido
 *   schemas:
 *      NotFoundError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Link não encontrado.
 *        hidden: true
 *      InternalSeverError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Ocorreu um erro interno no servidor. Tente novamente mais tarde.
 *        hidden: true
 */
//
