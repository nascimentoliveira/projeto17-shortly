import bcrypt from 'bcrypt';

import { signInSchema } from '../models/signIn.model.js';
import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  MESSAGE_FORMAT_ERROR
} from '../constants.js';

export function signInSchemaValid(req, res, next) {

  const user = req.body;

  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGE_FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.user = user;

  next();
}

export async function signInValid(req, res, next) {

  const { email, password } = res.locals.user;

  try {
    const [user] = (await connection.query(`
      SELECT 
        id, email, password
      FROM 
        users 
      WHERE 
        email=$1;`,
      [email]
    )).rows;

    if (!user) {
      res.status(401).send({ message: 'Usuário não cadastrado!' });
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