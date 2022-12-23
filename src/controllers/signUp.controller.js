import bcrypt from 'bcrypt';

import { userRepository } from '../repositories/user.repository.js';
import { MESSAGES, ROUNDS_ENCRYPT } from '../constants.js';

export async function postSignUp(req, res) {

  const { name, email, password } = res.locals.user;

  try {
    await userRepository.createUser(name, email, bcrypt.hashSync(password, ROUNDS_ENCRYPT));
    res.status(201).send({ message: 'Usuário criado com sucesso!' });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}