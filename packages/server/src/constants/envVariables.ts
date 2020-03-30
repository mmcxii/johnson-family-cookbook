import "dotenv/config";

export const {
  PORT = 4000,
  SALT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;
