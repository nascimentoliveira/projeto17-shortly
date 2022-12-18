import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR
} from '../constants.js';

export async function tokenValid(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const DAYS_TO_EXPIRE = 7;

  if (!token) {
    res.status(401).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });
    return;
  }

  try {
    const [session] = (await connection.query(`
    SELECT 
      users.id, 
      users.name, 
      users.email, 
      sessions."createdAt", 
      session.id AS sessionId
    FROM 
      sessions
    JOIN 
      users
    ON
      users.id=sessions."userId"
    WHERE 
      token=$1;`,
      [token]
    )).rows;

    if (!session) {
      res.status(404).send({ message: 'Usuário não encontrado!' });
      return;
    }

    if (session.createdAt.setDate(
      session.createdAt.getDate() + DAYS_TO_EXPIRE) < new Date) {
        await connection.query(`
          DELETE FROM
            sessions
          WHERE
            id=$1;`,
          [session.sessionId]
        );
      res.status(401).send({ message: 'Token expirado, entre com sua conta!' });
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