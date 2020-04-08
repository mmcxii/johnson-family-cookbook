import { config } from "dotenv";

import { findEnv } from "../utils/findEnv";

config({ path: findEnv() });

export const {
  PORT = 4000,
  SALT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE_NAME,
  WEB_URL = "http://localhost:3000",
} = process.env;
