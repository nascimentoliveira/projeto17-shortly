import httpStatus from "http-status";

import { userRepository } from "../repositories/user.repository.js";

export async function getRanking(req, res) {
  try {
    const ranking = (await userRepository.getRankingUsers()).rows;

    res.status(httpStatus.OK).send(ranking);

  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ 
      error: "Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}
//
