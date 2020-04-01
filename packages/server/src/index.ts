import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";

import {
  PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from "./constants/envVariables";
import { buildSchema } from "./utils/buildSchema";
import { refreshTokenRoute } from "./refreshTokenRoute";

(async () => {
  await createConnection({
    type: "postgres",
    database: POSTGRES_DB,
    name: "default",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/entities/**/*.{t,j}s`],
  }).then((db) => console.log(`Connection established with db ${db.name}`)); // eslint-disable-line no-console
  const schema = await buildSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  const app = express();
  app.use(cookieParser());

  apolloServer.applyMiddleware({ app, path: "/api/graphql" });

  app.use("/api/refresh_token", refreshTokenRoute);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // eslint-disable-line no-console
  });
})();
