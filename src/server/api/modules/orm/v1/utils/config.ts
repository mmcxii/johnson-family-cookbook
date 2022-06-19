import "dotenv/config";
import { Options } from "@mikro-orm/core";
import { ALL_ENTITIES } from "./all-entities";

/**
 * Mikro-ORM configuration.
 */
export default {
  type: "postgresql",
  host: process.env.ORM__DATABASE_HOST,
  port: Number.parseInt(process.env.ORM__DATABASE_PORT ?? "", 10),
  dbName: process.env.ORM__DATABASE_NAME,
  user: process.env.ORM__DATABASE_USERNAME,
  password: process.env.ORM__DATABASE_PASSWORD,
  entities: ALL_ENTITIES,
  driverOptions:
    process.env.NODE_ENV !== "development"
      ? {
          connection: {
            ssl: { rejectUnauthorized: false },
          },
        }
      : undefined,
  filters: {
    /**
     * The Soft Delete filter automatically removes items from any search that
     * has a value recorded for its `archived_at` property. This filter allows
     * for data to be soft deleted and thus more easily restored if the deletion was accidental.
     */
    softDelete: {
      args: false,
      cond: (_, type): any => {
        if (type !== "read") {
          return {};
        }

        return {
          archivedAt: null,
        };
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
} as Options;
