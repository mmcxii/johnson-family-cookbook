import { config } from "dotenv";

import { findEnv } from "../utils/findEnv";

config({ path: findEnv() });

export const {
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  PORT = 4000,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE_NAME,
  SALT,
  WEB_URL = "http://localhost:3000",
} = process.env;
