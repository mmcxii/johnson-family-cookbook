import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";

import { PORT } from "./constants/envVariables";
import { createSchema } from "./utils/createSchema";
import { createMenusLoader } from "./utils/loaders/menusLoader";

(async () => {
  await createConnection({
    name: "default",
    database: "jfcbdb",
    type: "postgres",
    username: "postgres",
    password: "postgres",
    port: 5432,
    synchronize: true,
    entities: [__dirname + "/entities/**/{,!(__test__)}/*.{t,j}s"],
  }).then((db) => {
    console.log(`Established connection with database: ${db.name}`);
  });
  const app = express();
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: () => ({
      menusLoader: createMenusLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, path: "/api/graphql" });

  app.listen(PORT, () => {
    console.log(`API available on port ${PORT}`);
  });
})();
