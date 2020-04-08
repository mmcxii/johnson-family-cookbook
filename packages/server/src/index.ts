import path from "path";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT, WEB_URL } from "./constants/envVariables";
import { srcOrDist } from "./constants/srcOrDist";
import { buildSchema } from "./utils/buildSchema";
import { refreshTokenRoute } from "./refreshTokenRoute";

(async () => {
  /**
   * Database Connection
   */
  try {
    const db = await createConnection({
      type: "postgres",
      database: "jfcb_db",
      name: "default",
      username: "postgres",
      password: "postgres",
      port: 5432,
      logging: process.env.NODE_ENV !== "production",
      entities: [path.join(srcOrDist, "entities", "**", "*.{t,j}s")],
      migrations: [path.join(srcOrDist, "migrations", "**", "*.{t,j}s")],
    });
    const migrations = await db.runMigrations();

    console.log(`Connection established with database: ${db.name}`); // eslint-disable-line no-console
    // eslint-disable-next-line no-console
    console.log(
      `Migrations ran: ${JSON.stringify(migrations.map((m) => m.name))}`,
    );
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
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
