import path from "path";

import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
} from "../constants/envVariables";
import { createDatabaseConnection } from "../utils/createDatabaseConnection";

export const testConnection = async (drop: boolean = false) => {
  const db = await createDatabaseConnection({
    type: "postgres",
    database: POSTGRES_DB_TEST,
    name: "default",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5433,
    dropSchema: drop,
    entities: [path.join(__dirname, "..", "entities", "**", "*.entity.{t,j}s")],
    migrations: [
      path.join(__dirname, "..", "migrations", "**", "*.migration.{t,j}s"),
    ],
  });

  return db;
};
