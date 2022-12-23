import { nanoid } from 'nanoid';

import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
} from '../constants.js';

export async function shorten(req, res) {

  const { id } = res.locals.user;
  const { urlId } = res.locals.urlId;
  const shortUrl = nanoid(8);

  try {
    await connection.query(`
      INSERT INTO 
        "usersUrls" 
        ("userId", "urlId", "shortUrl")
      VALUES 
        ($1, $2, $3);`,
      [id, urlId, shortUrl]
    );

    res.status(201).send({ shortUrl: shortUrl, message: 'Seu link agora é menor!' });

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}

export async function getLinkById(req, res) {

  delete res.locals.link.userId

  res.status(200).send(res.locals.link);
  return;
}

export async function redirectToLink(req, res) {

  const { id, bigUrl, visitCount } = res.locals.link;

  try {
    await connection.query(`
      UPDATE 
        "usersUrls"
      SET 
        "visitCount"=$1
      WHERE
        id=$2;`,
      [visitCount + 1, id]
    );

    res.redirect(bigUrl);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}

export async function deleteLink(req, res) {

  const { id } = res.locals.link;

  try {
    await connection.query(`
      DELETE FROM
        "usersUrls"
      WHERE
        id=$1;`,
      [id]
    );

    res.sendStatus(204);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}