import { userRepository } from '../repositories/user.repository.js';
import { MESSAGES } from '../constants.js';

export async function getRanking(req, res) {

  try {
    const ranking = (await userRepository.getRankingUsers()).rows;

    res.status(200).send(ranking);

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}