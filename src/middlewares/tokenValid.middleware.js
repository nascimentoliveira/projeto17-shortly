import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  DAYS_TOKEN_EXPIRE
} from '../constants.js';

export async function tokenValid(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });
    return;
  }

  try {
    const [user] = (await connection.query(`
    SELECT 
      users.id, 
      users.name, 
      users.email, 
      sessions."createdAt" AS sessionCreateTime, 
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

    if (!user) {
      res.status(404).send({ message: 'Usuário não encontrado!' });
      return;
    }

    if (user.sessionCreateTime.setDate(
      user.sessionCreateTime.getDate() + DAYS_TOKEN_EXPIRE) < new Date) {
        await connection.query(`
          DELETE FROM
            sessions
          WHERE
            id=$1;`,
          [user.sessionId]
        );
      res.status(401).send({ message: 'Token expirado, entre novamente com sua conta!' });
      return;
    }

    res.locals.user = { id: user.id, name: user.name, email: user.email }

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}