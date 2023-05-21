import { Router } from "express";

import usersController from "../controllers/users-controller.js";
import validateSchema from "../middlewares/schemaValidator.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import usersSchema from "../models/users-model.js";

export const users = Router();

users.post("/", validateSchema(usersSchema), usersMiddleware.userIsValid, usersController.createUser);

export default users;
/**
 * @swagger
 * paths:
 *   /api/users:
 *     post:
 *       summary: Cadastrar novo usuário.
 *       tags:
 *         - Usuários
 *       description: Esta rota é responsável por cadastrar os usuários na aplicação. Ela permite que os usuários utilize a plataforma fornecendo seu nome, email e senha.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRequest'
 *       responses:
 *         '201':
 *           description: Usuário cadastrado com sucesso.
 *           content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *         '409':
 *           description: Dados inválidos para cadastro de usuário.
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
 * components:
 *   schemas:
 *      UserRequest:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: John Doe
 *          email:
 *            type: string
 *            format: email
 *            example: john.doe@example.com
 *          password:
 *            type: string
 *            format: password
 *            example: password123
 *        required:
 *          - name
 *          - email
 *          - password
 *      UserResponse:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            example: Usuário criado com sucesso!
 *      ConflitError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: E-mail já cadastrado!
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
 *            example: Ocorreu um erro interno no servidor.Tente novamente mais tarde.
 */
//
