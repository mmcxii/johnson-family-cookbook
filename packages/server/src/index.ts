import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";

import {
  PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  REFRESH_TOKEN_SECRET,
} from "./constants/envVariables";
import { buildSchema } from "./utils/buildSchema";
import { User } from "./entities/User";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./modules/user/utils/auth";

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

  app.post("/api/refresh_token", async (req, res) => {
    const token = req.cookies.rtc;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any | null = null;
    try {
      payload = verify(token, REFRESH_TOKEN_SECRET!);
    } catch (err) {
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({
      where: { _externalId_: payload.userId },
    });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // eslint-disable-line no-console
  });
})();
