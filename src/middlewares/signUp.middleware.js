import { signUpSchema } from '../models/signUp.model.js';
import { userRepository } from '../repositories/user.repository.js';
import { MESSAGES } from '../constants.js';

export function signUpSchemaValid(req, res, next) {

  const user = req.body;

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGES.FORMAT_ERROR, errors: errors });
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
    const [user] = (await userRepository.getUserByEmail(email)).rows;

    if (user) {
      res.status(409).send({ message: 'E-mail já cadastrado!' });
      return;
    }

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}