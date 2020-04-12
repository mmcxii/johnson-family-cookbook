import { Connection } from "typeorm";

import { testConnection } from "./testConnection";

export const handleTestDatabaseConnection = () => {
  let conn: Connection | undefined;
  beforeAll(async () => {
    conn = await testConnection();
  });

  afterAll(() => {
    if (conn) {
      conn.close();
    }
  });
};
