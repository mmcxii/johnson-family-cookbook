import path from "path";

import { createConnection } from "typeorm";

import { POSTGRES_USER, POSTGRES_PASSWORD } from "../constants/envVariables";

export const testConnection = (drop: boolean) =>
  createConnection({
    type: "postgres",
    database: "jfcb_db_test",
    name: "default",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5432,
    dropSchema: drop,
    synchronize: drop,
    entities: [path.join("..", "entities", "**", "*.{,!(test).}{t,j}s")],
    migrations: [path.join("..", "migrations", "**", "*.{t,j}s")],
  });
