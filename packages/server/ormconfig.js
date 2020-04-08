const path = require("path");
require("dotenv").config();

// const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV } = process.env;
const srcOrDist = process.env.NODE_ENV === "production" ? "dist" : "src";

module.exports = {
  type: "postgres",
  database: "jfcb_db",
  name: "default",
  username: "postgres",
  password: "postgres",
  entities: [path.join(srcOrDist, "entities", "**", "*.{t,j}s")],
  migrations: [path.join("src", "migrations", "**", "*.{t,j}s")],
  cli: {
    entitiesDir: path.join(srcOrDist, "entities"),
    migrationsDir: path.join(srcOrDist, "migrations"),
  },
};
