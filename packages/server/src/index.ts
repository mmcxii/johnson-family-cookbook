import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

import { PORT } from "./constants/envVariables";
import { buildSchema } from "./utils/buildSchema";

(async () => {
  await createConnection({
    type: "postgres",
    database: "jfcb_db",
    name: "default",
    username: "postgres",
    password: "postgres",
    port: 5432,
    synchronize: true,
    entities: [__dirname + "/entities/**/*.{t,j}s"],
  })
    .then((db) => console.log(`Connection established with db ${db.name}`))
    .catch((err) => console.log(err.message));
  const schema = await buildSchema();
  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app, path: "/api/graphql" });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
