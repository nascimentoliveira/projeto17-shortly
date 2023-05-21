import { v4 as uuid } from "uuid";
import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

export async function login(req, res) {
  const { id, name } = res.locals.user;
  const token = uuid();
  try {
    await usersRepository.createSession(id, token);
    res.status(httpStatus.OK).send({
      name: name,
      token: token,
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

const authController = {
  login,
};

export default authController;
//
