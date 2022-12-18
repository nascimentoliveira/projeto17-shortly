import bcrypt from 'bcrypt';

import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  ROUNDS_ENCRYPT
} from '../constants.js';

export async function postSignUp(req, res) {

  const { name, email, password } = res.locals.user;

  try {
    await connection.query(`
      INSERT INTO 
        users 
        (name, email, password)
      VALUES 
        ($1, $2, $3);`,
      [name, email, bcrypt.hashSync(password, ROUNDS_ENCRYPT)]
    );

    res.status(201).send({ message: 'Usuário criado com sucesso!' });

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}