import { urlSchema } from '../models/url.model.js';
import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
  MESSAGE_FORMAT_ERROR
} from '../constants.js';

export function urlSchemaValid(req, res, next) {

  const url = req.body;

  const { error } = urlSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: MESSAGE_FORMAT_ERROR, errors: errors });
    return;
  }

  res.locals.url = url;

  next();
}

export async function urlValid(req, res, next) {

  const { id } = res.locals.user;
  const { url } = res.locals.url;

  try {
    const [urlUser] = (await connection.query(`
      SELECT 
        * 
      FROM 
        urls 
      WHERE 
        "userId"=$1 AND url=$2;`,
      [id, url]
    )).rows;

    if (urlUser) {
      res.status(409).send({ message: 'Este link já foi encurtado!' });
      return;
    }

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}