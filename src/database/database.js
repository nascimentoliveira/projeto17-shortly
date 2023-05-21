import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export function checkDatabaseConnection() {
  return new Promise((resolve, reject) => {
    connectionDB.connect((error) => {
      if (error) {
        resolve("disconnected");
      } else {
        resolve("connected");
      }
    });
  });
}

export default connectionDB;
//
