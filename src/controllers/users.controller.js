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
            'id', url.id, 
            'shortUrl', url."shortUrl", 
            'url', url.url, 
            'visitCount', url."visitCount"
          )) AS "shortenedUrls"
        FROM
          urls AS url
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

    /* const [userShortenedUrls] = (await connection.query(`
        SELECT 
        json_agg(json_build_object(
            'id', urls.id, 
            'shortUrl', urls."shortUrl", 
            'url', urls.url, 
            'visitCount', urls."visitCount"
          )) AS "shortenedUrls"
        FROM
          urls
       
    ;`
    )).rows; */

    res.status(200).send(userShortenedUrls);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}