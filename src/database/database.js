import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

const connectionDB = new Pool(configDatabase);

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
