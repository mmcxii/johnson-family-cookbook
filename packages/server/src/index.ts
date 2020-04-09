import path from "path";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";

import {
  PORT,
  WEB_URL,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from "./constants/envVariables";
import { srcOrDist } from "./constants/srcOrDist";
import { buildSchema } from "./utils/buildSchema";
import { refreshTokenRoute } from "./refreshTokenRoute";

let connectionAttempts = 5;
(async () => {
  /**
   * Database Connection
   */
  while (connectionAttempts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const db = await createConnection({
        type: "postgres",
        database: POSTGRES_DB,
        name: "default",
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: 5432,
        logging: process.env.NODE_ENV !== "production",
        entities: [path.join(srcOrDist, "entities", "**", "*.{t,j}s")],
        migrations: [path.join(srcOrDist, "migrations", "**", "*.{t,j}s")],
      });
      // eslint-disable-next-line no-await-in-loop
      const migrations = await db.runMigrations();

      console.log(`Connection established with database: ${db.name}`); // eslint-disable-line no-console
      // eslint-disable-next-line no-console
      console.log(
        `Migrations ran: ${JSON.stringify(migrations.map((m) => m.name))}`,
      );
      break;
    } catch (err) {
      connectionAttempts -= 1;

      console.log(err); // eslint-disable-line no-console
      console.log(`Connection attempts remaining: ${connectionAttempts}`); // eslint-disable-line no-console

      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  /**
   * Apollo Server Setup
   */
  const schema = await buildSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  /**
   * Express Setup
   */
  const app = express();

  /**
   * Middleware Setup
   */

  // Cors
  app.use(cors({ credentials: true, origin: WEB_URL }));

  // Cookie Parser
  app.use(cookieParser());

  /**
   * Connect Express and Apollo
   */
  apolloServer.applyMiddleware({ app, path: "/api/graphql", cors: false });

  /**
   * External route for generating tokens.
   */
  app.use("/api/refresh_token", refreshTokenRoute);

  /**
   * Start the server.
   */
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // eslint-disable-line no-console
  });
})();
