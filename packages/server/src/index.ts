/* eslint-disable no-console */
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT, WEB_URL, NODE_ENV } from "./constants/envVariables";
import { buildSchema } from "./utils/buildSchema";
import { refreshTokenRoute } from "./refreshTokenRoute";
import { callDatabaseConnection } from "./utils/callDatabaseConnection";
import { testUtilityRoute } from "./testUtilityRoutes";

(async () => {
  /**
   * Database Connection
   */
  await callDatabaseConnection();

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

  if (NODE_ENV !== "production") {
    console.log({ NODE_ENV });
    app.use("/api/test", testUtilityRoute);
  }

  /**
   * Start the server.
   */
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
