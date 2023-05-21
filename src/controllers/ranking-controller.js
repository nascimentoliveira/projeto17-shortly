import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

export async function getRanking(req, res) {
  try {
    const ranking = (await usersRepository.getRankingUsers()).rows;
    res.status(httpStatus.OK).send(ranking);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    });
  }
}

const rankingController = {
  getRanking,
};

export default rankingController;
//
