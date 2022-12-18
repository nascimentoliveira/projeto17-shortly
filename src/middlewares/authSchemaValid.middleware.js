import { authSchemaSignIn, authSchemaSignUp } from '../models/authentication.model.js';

import { MESSAGE_FORMAT_ERROR } from '../constants.js';

export function authSchemaSignInValid(req, res, next) {

  const user = req.body;

  const { error } = authSchemaSignIn.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGE_FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.user = user;

  next();
}

export function authSchemaSignUpValid(req, res, next) {

  const user = req.body;

  const { error } = authSchemaSignUp.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGE_FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.user = user;

  next();
}