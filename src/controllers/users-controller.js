import bcrypt from "bcrypt";
import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

const ROUNDS_ENCRYPT = 12;

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await usersRepository.createUser(name, email, bcrypt.hashSync(password, ROUNDS_ENCRYPT));
    res.status(httpStatus.CREATED).send({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

const usersController = {
  createUser,
};

export default usersController;
//
