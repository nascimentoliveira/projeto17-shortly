import { signUpSchema } from '../models/signUp.model.js';
import { connection } from '../database/database.js';

import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  MESSAGE_FORMAT_ERROR
} from '../constants.js';

export function signUpSchemaValid(req, res, next) {

  const user = req.body;

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGE_FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.user = user;

  next();
}

export async function signUpValid(req, res, next) {

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