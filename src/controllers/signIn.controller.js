import { v4 as uuid } from 'uuid';

import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR
} from '../constants.js';

export async function postSignIn(req, res) {
  const { id, name } = res.locals.user;
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

    res.status(200).send({ name: name, token: token });

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}