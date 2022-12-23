import { connection } from '../database/database.js';

async function insertUrl(url) {
  return connection.query(`
    INSERT INTO 
      urls 
      ("bigUrl")
    VALUES 
      ($1)
    ON CONFLICT ("bigUrl") DO NOTHING;`,
    [url]
  );
}

async function createShortUrl(userId, urlId, shortUrl) {
  return connection.query(`
    INSERT INTO 
      "usersUrls" 
      ("userId", "urlId", "shortUrl")
    VALUES 
      ($1, $2, $3);`,
    [userId, urlId, shortUrl]
  );
}

async function getIdUrl(url) {
  return connection.query(`
    SELECT 
      id
    FROM
      urls
    WHERE "bigUrl"=$1;`,
    [url]
  );
}

async function getLinkById(id) {
  return connection.query(`
    SELECT 
      "usersUrls".id,
      "usersUrls"."userId",
      "usersUrls"."shortUrl", 
      urls."bigUrl" AS url
    FROM 
      "usersUrls"
    JOIN
      urls
    ON
      "usersUrls"."urlId"=urls.id
    WHERE 
      "usersUrls".id=$1;`,
    [id]
  );
}

async function getLinkByShortUrl(shortUrl) {
  return connection.query(`
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
  );
}

async function getShortUrlsByUserId(userId) {
  return connection.query(`
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
    [userId]
  );
}

async function matchUserUrl(userId, url) {
  return connection.query(`
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
    [userId, url]
  );
}

async function updateVisitsCount(shortUrlId, visitCount) {
  return connection.query(`
    UPDATE 
      "usersUrls"
    SET 
      "visitCount"=$1
    WHERE
      id=$2;`,
    [visitCount + 1, shortUrlId]
  );
}

async function deleteShortURl(shortUrlId) {
  return connection.query(`
    DELETE FROM
      "usersUrls"
    WHERE
      id=$1;`,
    [shortUrlId]
  );
}

export const urlRepository = {
  insertUrl,
  createShortUrl,
  getIdUrl,
  getLinkById,
  getLinkByShortUrl,
  getShortUrlsByUserId,
  matchUserUrl,
  updateVisitsCount,
  deleteShortURl
};