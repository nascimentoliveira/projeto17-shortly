import { connection } from '../database/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  ROUNDS_ENCRYPT
} from '../constants.js';

export async function signIn(req, res) {
  const { id } = res.locals.user;
  const token = uuid();

  try {
    await connection.query(`
      INSERT INTO 
        sessions 
        ("userId", token)
      VALUES 
        ($1, $2);`,
      [id, token]
    );

    res.status(200).send({ token: token });

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }

  return;
}

export async function signUp(req, res) {

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

  return;
}