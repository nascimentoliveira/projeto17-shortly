import { connection } from '../database/database.js';
import bcrypt from 'bcrypt';

import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR
} from '../constants.js';

export async function authValidSignIn(req, res, next) {

  const { email, password } = res.locals.user;

  try {
    const user = (await connection.query(`
      SELECT 
        id, email, password
      FROM 
        users 
      WHERE 
        email=$1;`,
      [email]
    )).rows[0];

    if (!user) {
      res.status(401).send({ message: 'Usuário inválido!' });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'Senha inválida!' });
      return;
    }

    res.locals.user = user;

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function authValidSignUp(req, res, next) {

  const { email, password, confirmPassword } = res.locals.user;

  if (password !== confirmPassword) {
    res.status(400).send({ message: 'Confirmação de senha não confere!' });
    return;
  }

  try {
    const user = (await connection.query(`
      SELECT 
        email
      FROM 
        users 
      WHERE 
        email=$1;`,
      [email]
    )).rows[0];

    if (user) {
      res.status(409).send({ message: 'E-mail já cadastrado!' });
      return;
    }

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function authValidToken(req, res, next) {
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