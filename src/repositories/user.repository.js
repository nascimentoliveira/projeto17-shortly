import { connection } from '../database/database.js';

async function createUser(name, email, password) {
  return connection.query(`
    INSERT INTO 
      users 
      (name, email, password)
    VALUES 
      ($1, $2, $3);`,
    [name, email, password]
  );
}

async function createSession(userId, token) {
  return connection.query(`
    INSERT INTO 
      sessions 
      ("userId", token)
    VALUES 
      ($1, $2);`,
    [userId, token]
  );
}

async function getUserByEmail(email) {
  return connection.query(`
    SELECT 
      id, name, email, password
    FROM 
      users 
    WHERE 
      email=$1;`,
    [email]
  );
}

export const userRepository = {
  createSession,
  getUserByEmail,
  createUser
};