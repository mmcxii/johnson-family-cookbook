import { createConnection, ConnectionOptions, Connection } from "typeorm";

export const createDatabaseConnection = async (
  options: ConnectionOptions,
  connectionAttempts = 5,
) => {
  let conn: Connection | undefined;

  while (connectionAttempts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      conn = await createConnection(options);

      /**
       * Once the connection with the database is established the schema is checked to
       * determine which migrations, if any, need to be executed.
       */
      // eslint-disable-next-line no-await-in-loop
      const migrations = await conn.runMigrations();

      console.log(`Connection established with database: ${conn.name}`); // eslint-disable-line no-console
      // eslint-disable-next-line no-console
      console.log(
        `Migrations ran: ${JSON.stringify(migrations.map((m) => m.name))}`,
      );

      /**
       * Once the connection has been established and all migrations are ran
       * the loop can be exited.
       */
      break;
    } catch (err) {
      /**
       * If an error occurs the number of remaining connection attempts is decermented,
       */
      // eslint-disable-next-line no-param-reassign
      connectionAttempts -= 1;

      console.log(err); // eslint-disable-line no-console
      console.log(`Connection attempts remaining: ${connectionAttempts}`); // eslint-disable-line no-console

      /**
       * The app should wait five (5) seconds before reattempting to connect.
       */
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  return conn;
};
