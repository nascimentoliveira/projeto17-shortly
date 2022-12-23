import { v4 as uuid } from 'uuid';

import { userRepository } from '../repositories/user.repository.js';
import { MESSAGES } from '../constants.js';

export async function postSignIn(req, res) {
  const { id, name } = res.locals.user;
  const token = uuid();

  try {
    await userRepository.createSession(id, token);
    res.status(200).send({ name: name, token: token });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}