import connectionDB from "../database/database.js";

async function insertBigURL(bigURL) {
  return connectionDB.query(`
    INSERT INTO 
      "bigURLs" 
      ("bigURL")
    VALUES 
      ($1)
    ON CONFLICT ("bigURL") DO NOTHING;`,
    [bigURL]
  );
}

async function createShortURL(userId, bigURLId, shortURL) {
  return connectionDB.query(`
    INSERT INTO 
      "shortURLs" 
      ("userId", "bigURLId", "shortURL")
    VALUES 
      ($1, $2, $3);`,
    [userId, bigURLId, shortURL]
  );
}

async function getBigURLId(bigURL) {
  return connectionDB.query(`
    SELECT 
      id
    FROM
      "bigURLs"
    WHERE "bigURL"=$1;`,
    [bigURL]
  );
}

async function getShortURLById(shortURLId) {
  return connectionDB.query(`
    SELECT 
      "shortURLs".id,
      "shortURLs"."userId",
      "shortURLs"."shortURL", 
      "bigURLs"."bigURL" 
    FROM 
      "shortURLs"
    JOIN
      "bigURLs"
    ON
      "shortURLs"."bigURLId"="bigURLs".id
    WHERE 
      "shortURLs".id=$1;`,
    [shortURLId]
  );
}

async function getBigURLByShortURL(shortURL) {
  return connectionDB.query(`
    SELECT 
      "shortURLs".id, 
      "shortURLs"."shortURL", 
      "shortURLs"."visitCount", 
      "bigURLs"."bigURL" 
    FROM 
      "shortURLs"
    JOIN
      "bigURLs"
    ON
      "shortURLs"."bigURLId"="bigURLs".id
    WHERE 
      "shortURL"=$1;`,
    [shortURL]
  );
}

async function getShortURLsByUserId(userId) {
  return connectionDB.query(`
    SELECT 
      users.id, 
      users.name, 
      SUM("shortURLs"."visitCount") AS "visitCount", (
        SELECT 
          json_agg(json_build_object(
            'id', "shortURLs".id, 
            'shortURL', "shortURLs"."shortURL", 
            'bigURL', "bigURLs"."bigURL", 
            'visitCount', "shortURLs"."visitCount"
          )) AS "shortenedURLs"
        FROM
          "shortURLs"
        JOIN  
          "bigURLs"
        ON 
          "shortURLs"."bigURLId"="bigURLs".id
        WHERE
          "shortURLs"."userId"=$1
      ) 
    FROM  
      "shortURLs"
    JOIN  
      "bigURLs"
    ON 
      "shortURLs"."bigURLId"="bigURLs".id
    JOIN  
      users 
    ON 
      "shortURLs"."userId"=users.id
    WHERE
      "shortURLs"."userId"=$1
    GROUP BY
      users.id;`,
    [userId]
  );
}

async function checkIsShortened(userId, bigURLId) {
  return connectionDB.query(`
    SELECT 
      * 
    FROM 
      "shortURLs"
    WHERE 
      "userId"=$1 AND "bigURLId"=$2;`,
    [userId, bigURLId]
  );
}

async function updateVisitsCount(shortURLId, visitCount) {
  return connectionDB.query(`
    UPDATE 
      "shortURLs"
    SET 
      "visitCount"=$1
    WHERE
      id=$2;`,
    [visitCount + 1, shortURLId]
  );
}

async function deleteShortURL(shortURLId) {
  return connectionDB.query(`
    DELETE FROM
      "shortURLs"
    WHERE
      id=$1;`,
    [shortURLId]
  );
}

const urlsRepository = {
  insertBigURL,
  createShortURL,
  getBigURLId,
  getShortURLById,
  getBigURLByShortURL,
  getShortURLsByUserId,
  checkIsShortened,
  updateVisitsCount,
  deleteShortURL,
};

export default urlsRepository;
//
