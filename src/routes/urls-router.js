import { Router } from "express";

import urlsController from "../controllers/urls-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import validateSchema from "../middlewares/schemaValidator.js";
import urlsSchema from "../models/urls-model.js";
import urlsMiddleware from "../middlewares/urls-middleware.js";

export const urls = Router();

urls
  .all("/*", authMiddleware.tokenValid)
  .post("/", validateSchema(urlsSchema), urlsMiddleware.registerURL, urlsMiddleware.checkIsShortened, urlsController.createShortURL)
  .get("/", urlsController.getUserShortenedURLs)
  .delete("/:shortURLId", urlsMiddleware.shortURLIdValid, urlsMiddleware.userIsOwner, urlsController.deleteShortURL);

export default urls;
/**
 * @swagger
 * paths:
 *   /api/urls:
 *     post:
 *       summary: Cria novo link encurtado.
 *       tags:
 *         - URLs
 *       security:
 *         - bearerAuth: []
 *       description: Esta rota é responsável por novos links e gerar um identificador mais curto.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URLRequest'
 *       responses:
 *         '201':
 *           description: Link cadastrado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/URLResponsePost'
 *         '401':
 *           description: Token de acesso ausente ou inválido
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnauthorizedError'
 *         '409':
 *           description: Dados inválidos para cadastro de link.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ConflitError'
 *         '422':
 *           description: Dados inválidos ou incompletos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnprocessableEntityError'
 *         '500':
 *           description: Erro interno do servidor.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 *     get:
 *       summary: Obter urls que usuário encurtou
 *       tags:
 *         - URLs
 *       security:
 *       - bearerAuth: []
 *       description: Retorna todas as URLs que o usuário encurtou.
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/URLResponseGET'
 *         '401':
 *           description: Token de acesso ausente ou inválido
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnauthorizedError'
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 *     delete:
 *       summary: Apaga um link encurtado pelo ID.
 *       tags:
 *         - URLs
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: shortURLId
 *           in: path
 *           description: ID do link encurtado a ser apagado.
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/URLResponseDELETE'
 *         '401':
 *           description: Token de acesso ausente ou inválido
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnauthorizedError'
 *         '403':
 *           description: Não possui permissão para executar esta operação
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ForbiddenError'
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
 *      URLRequest:
 *        type: object
 *        properties:
 *          bigURL:
 *            type: string
 *            example: https://www.yourbiglink.com
 *        required:
 *          - bigURL
 *      URLResponsePost:
 *        type: object
 *        properties:
 *          shortURL:
 *            type: string
 *            example: eXampI_e
 *          message:
 *            type: string
 *            example: Seu link agora é menor!
 *      URLResponseGET:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *            example: John
 *          visitCount:
 *            type: number
 *          shortenedUrls:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *              shortUrl:
 *                type: string
 *                example: JPT_akl8
 *              url:
 *                type: string
 *                example: https://www.yourbiglink.com
 *              visitCount:
 *                type: number
 *      URLResponseDELETE:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            example: Link excluído!
 *      UnauthorizedError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Token expirado, entre novamente com sua conta!
 *      ForbiddenError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Operação não permitida! Você não é o proprietário deste link encurtado.
 *      NotFoundError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Link não encontrado.
 *      ConflitError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Este link já foi encurtado por você!
 *      UnprocessableEntityError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Não foi possível processar a requisição. Verifique os campos e tente novamente.
 *          errors:
 *            type: array
 *            items:
 *              oneOf:
 *                - type: string
 *      InternalSeverError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Ocorreu um erro interno no servidor. Tente novamente mais tarde.
 */
//
