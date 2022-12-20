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

export async function urlRegistered(req, res, next) {

  const { url } = res.locals.url;

  try {
    await connection.query(`
      INSERT INTO 
        urls ("bigUrl")
      VALUES 
        ($1)
      ON CONFLICT ("bigUrl") DO NOTHING;`,
      [url]
    );

    const [urlId] = (await connection.query(`
      SELECT 
        id
      FROM
        urls
      WHERE "bigUrl"=$1;`,
      [url]
    )).rows;

    res.locals.urlId = { urlId: urlId.id };

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

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
        "usersUrls"
      JOIN
        users
      ON
        "usersUrls"."userId"=users.id
      JOIN
        urls
      ON
        "usersUrls"."urlId"=urls.id
      WHERE 
        users.id=$1 AND urls."bigUrl"=$2;`,
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

export async function shortIdValid(req, res, next) {

  const { id } = req.params;

  try {
    const [url] = (await connection.query(`
      SELECT 
        "usersUrls".id,
        "usersUrls"."userId",
        "usersUrls"."shortUrl", 
        urls.bigUrl AS url
      FROM 
        "usersUrls"
      JOIN
        urls
      ON
        "usersUrls"."urlId"=urls.id
      WHERE 
        "usersUrls".id=$1;`,
      [id]
    )).rows;

    if (!link) {
      res.status(404).send({ message: 'Link não cadastrado!' });
      return;
    }

    res.locals.link = link;

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function shortUrlValid(req, res, next) {

  const { shortUrl } = req.params;

  try {
    const [link] = (await connection.query(`
      SELECT 
        "usersUrls".id, "usersUrls"."shortUrl", "usersUrls"."visitCount", urls."bigUrl" 
      FROM 
        "usersUrls"
      JOIN
        urls
      ON
        "usersUrls"."urlId"=urls.id
      WHERE 
        "shortUrl"=$1;`,
      [shortUrl]
    )).rows;

    if (!link) {
      res.status(404).send({ message: 'Link não cadastrado!' });
      return;
    }

    res.locals.link = link;

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export function urlUserValid(req, res, next) {

  const { userId } = req.res.locals.link;
  const { id } = res.locals.user;

  if (userId !== id) {
    res.status(401).send({ message: 'Operação não permitida!' });
    return;
  }

  next();
}