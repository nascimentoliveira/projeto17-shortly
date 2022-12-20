import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
} from '../constants.js';

export async function getUserShortenedUrls(req, res) {

  const { id } = res.locals.user;

  try {
    const [userShortenedUrls] = (await connection.query(`
      SELECT 
        users.id, users.name, SUM("usersUrls"."visitCount") AS "visitCount", (
          SELECT 
            json_agg(json_build_object(
              'id', "usersUrls".id, 
              'shortUrl', "usersUrls"."shortUrl", 
              'url', urls."bigUrl", 
              'visitCount', "usersUrls"."visitCount"
            )) AS "shortenedUrls"
          FROM
            "usersUrls"
          JOIN  
            urls
          ON 
            "usersUrls"."urlId"=urls.id
          WHERE
            "usersUrls"."userId"=$1
        ) 
      FROM  
        "usersUrls"
      JOIN  
        urls
      ON 
        "usersUrls"."urlId"=urls.id
      JOIN  
        users 
      ON 
        "usersUrls"."userId"=users.id
      WHERE
        "usersUrls"."userId"=$1
      GROUP BY
        users.id;`,
      [id]
    )).rows;

    res.status(200).send(userShortenedUrls);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}