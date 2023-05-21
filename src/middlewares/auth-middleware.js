import bcrypt from "bcrypt";
import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

const DAYS_TOKEN_EXPIRE = 7;

export async function authValid(req, res, next) {
  const { email, password } = req.body;
  try {
    const [user] = (await usersRepository.getUserByEmail(email)).rows;
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(httpStatus.UNAUTHORIZED).send({
        error: "Usuário não cadastrado ou senha inválida!",
      });
      return;
    }
    res.locals.user = user;
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
    return;
  }
  next();
}

export async function tokenValid(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).send({
      error: "Formato de cabeçalho inesperado! Campo 'Authorization' não encontrado.",
    });
    return;
  }
  try {
    const [user] = (await usersRepository.getUserByToken(token)).rows;
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "Usuário não encontrado!",
      });
      return;
    }
    if (user.sessionCreatedAt.setDate(
      user.sessionCreatedAt.getDate() + DAYS_TOKEN_EXPIRE) < new Date) {
      res.status(httpStatus.UNAUTHORIZED).send({
        error: "Token expirado, entre novamente com sua conta!",
      });
      return;
    }
    res.locals.user = { id: user.id, name: user.name, email: user.email };
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
    return;
  }
  next();
}

const authMiddleware = {
  authValid,
  tokenValid,
}

export default authMiddleware;
//
