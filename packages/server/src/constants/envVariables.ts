import "dotenv/config";

export const {
  PORT = 4000,
  SALT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  REDIS_SECRET,
  REDIS_URL,
  LOGIN_COOKIE_NAME,
} = process.env;
