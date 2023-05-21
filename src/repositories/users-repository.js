import connectionDB from "../database/database.js";

async function createUser(name, email, password) {
  return connectionDB.query(`
    INSERT INTO 
      users
      (name, email, password)
    VALUES 
      ($1, $2, $3);`,
    [name, email, password]
  );
}

async function createSession(userId, token) {
  return connectionDB.query(`
    INSERT INTO 
      sessions 
      ("userId", token)
    VALUES 
      ($1, $2);`,
    [userId, token]
  );
}

async function getUserByEmail(email) {
  return connectionDB.query(`
    SELECT 
      id, name, email, password
    FROM 
      users 
    WHERE 
      email=$1;`,
    [email]
  );
}

async function getUserByToken(token) {
  return connectionDB.query(`
    SELECT 
      users.id, 
      users.name, 
      users.email, 
      sessions."createdAt" AS "sessionCreatedAt", 
      sessions.id AS "sessionId"
    FROM 
      sessions
    JOIN 
      users
    ON
      users.id=sessions."userId"
    WHERE 
      sessions.token=$1;`,
    [token]
  );
}

async function getRankingUsers() {
  return connectionDB.query(`
    SELECT 
      users.id, 
      users.name, 
      COUNT("shortURLs"."visitCount") AS "linksCount", 
      COALESCE(SUM("shortURLs"."visitCount"), 0) AS "visitCount"
    FROM
      users 
    LEFT JOIN  
      "shortURLs"
    ON 
      users.id="shortURLs"."userId"
    GROUP BY
      users.id
    ORDER BY
      "visitCount" DESC
    LIMIT 10;`
  );
}

const usersRepository = {
  createUser,
  createSession,
  getUserByEmail,
  getUserByToken,
  getRankingUsers,
};

export default usersRepository;
//
