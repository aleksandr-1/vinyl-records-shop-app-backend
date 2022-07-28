import { ClientConfig } from "pg";

const dbConfig: ClientConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  port: +process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default dbConfig;
