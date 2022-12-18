import { connection } from '../database/database.js';

import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR
} from '../constants.js';

export async function tokenValid(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(400).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });
    return;
  }

  try {
    const session = (await connection.query(`
    SELECT 
      users.id, users.name, users.email, session.expiredAt
    FROM 
      sessions
    JOIN 
      users
    ON
      users.id=session."userId"
    WHERE 
      token=$1;`,
      [token]
    )).rows[0];

    if (!session.expiredAt < new Date) {
      res.status(401).send({ message: 'Entre com sua conta!' });
      return;
    }

    res.locals.user = { id: session.id, name: session.name, email: session.email }

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}