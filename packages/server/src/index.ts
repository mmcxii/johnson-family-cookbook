import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import { PORT } from "./constants/envVariables";
import { createSchema } from "./utils/createSchema";

(async () => {
  const app = express();
  const schema = await createSchema();
  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app, path: "/api/graphql" });

  app.listen(PORT, () => {
    console.log(`API available on port ${PORT}`);
  });
})();
