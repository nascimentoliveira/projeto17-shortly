import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
} from '../constants.js';

export async function getUserShortenedUrls(req, res) {

  try {
    const [userShortenedUrls] = (await connection.query(`
      SELECT 
        users.id, users.name, SUM(urls."visitCount") AS "visitCount", (
          SELECT 
            json_agg(json_build_object(
              'id', u.id, 
              'shortUrl', u."shortUrl", 
              'url', u.url, 
              'visitCount', u."visitCount"
            )) AS "shortenedUrls"
          FROM
            urls AS u
        ) 
      FROM  
        urls
      JOIN  
        users 
      ON 
        users.id=urls."userId"
      GROUP BY
        users.id;`
    )).rows;

    res.status(200).send(userShortenedUrls);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}