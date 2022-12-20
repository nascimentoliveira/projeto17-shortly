import { connection } from '../database/database.js';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_CLIENT_SERVER_ERROR,
} from '../constants.js';

export async function getRanking(req, res) {

  try {
    const ranking = (await connection.query(`
      SELECT 
        users.id, 
        users.name, 
        COUNT("usersUrls"."visitCount") AS "linksCount", 
        COALESCE(SUM("usersUrls"."visitCount"), 0) AS "visitCount"
      FROM
        users 
      LEFT JOIN  
        "usersUrls"
      ON 
        users.id="usersUrls"."userId"
      GROUP BY
        users.id
      ORDER BY
        "visitCount" DESC
      LIMIT 10;`
    )).rows;

    res.status(200).send(ranking);

  } catch (err) {
    console.error(MESSAGE_INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGE_CLIENT_SERVER_ERROR });
  }
}