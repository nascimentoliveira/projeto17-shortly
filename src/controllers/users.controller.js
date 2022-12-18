import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
} from '../constants.js';

export async function getUserShortenedUrls(req, res) {

  try {
    const userShortenedUrls = (await connection.query(`
    SELECT 
      users.id, users.name,  
      json_build_object(
        url.id, url."shortUrl", url, "visitCount"
      ) AS "shortenedUrls"
    FROM  
      urls
    JOIN  
      users 
    ON 
      users.id=urls."userId";`
    ));

    res.status(200).send(userShortenedUrls);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}