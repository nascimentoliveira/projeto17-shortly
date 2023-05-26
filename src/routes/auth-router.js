import { Router } from "express";

import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";
import authSchema from "../models/auth-model.js";

const auth = Router();

auth
  .post("/", validateSchema(authSchema), authMiddleware.authValid, authController.login);

export default auth;
/**
 * @swagger
 * paths:
 *   /api/auth:
 *     post:
 *       summary: Realizar login do usuário.
 *       tags:
 *         - Autenticação
 *       description: Esta rota é responsável por autenticar os usuários na aplicação. Ela permite que os usuários realizem o login fornecendo seu email e senha.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRequest'
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *         '401':
 *           description: Usuário não cadastrado ou senha inválida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnauthorizedError'
 *         '422':
 *           description: Dados inválidos ou incompletos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UnprocessableEntityError'
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InternalSeverError'
 * components:
 *   ignored: true
 *   schemas:
 *      LoginRequest:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            example: john.doe@example.com
 *          password:
 *            type: string
 *            format: password
 *            example: password123
 *        required:
 *          - email
 *          - password
 *      LoginResponse:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: John Doe
 *          token:
 *            type: string
 *            example: ef9e3e32-e9c0-4bfe-a407-027b45efd990
 *      UnauthorizedError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: Usuário não cadastrado ou senha inválida!
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
