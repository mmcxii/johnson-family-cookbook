import path from "path";

import { createDatabaseConnection } from "./createDatabaseConnection";
import {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
} from "../constants/envVariables";
import { srcOrDist } from "../constants/srcOrDist";

export const callDatabaseConnection = async () => {
  await createDatabaseConnection({
    type: "postgres",
    database: POSTGRES_DB,
    name: "default",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5432,
    logging: NODE_ENV !== "production",
    entities: [path.join(srcOrDist, "entities", "**", "*.entity.{t,j}s")],
    migrations: [
      path.join(srcOrDist, "migrations", "**", "*.migration.{t,j}s"),
    ],
  });
};
