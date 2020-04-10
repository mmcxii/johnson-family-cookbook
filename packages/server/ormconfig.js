const path = require("path");
require("dotenv").config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV } = process.env;
const srcOrDist = NODE_ENV === "production" ? "dist" : "src";

module.exports = {
  type: "postgres",
  database: POSTGRES_DB,
  name: "default",
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: [path.join(srcOrDist, "entities", "**", "*.{t,j}s")],
  migrations: [path.join("src", "migrations", "**", "*.{t,j}s")],
  cli: {
    entitiesDir: path.join(srcOrDist, "entities"),
    migrationsDir: path.join(srcOrDist, "migrations"),
  },
};
