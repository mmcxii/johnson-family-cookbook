import { Options } from "@mikro-orm/core";
import "dotenv/config";
import { UserV1 } from "../../entities";

/**
 * Mikro-ORM configuration.
 */
export default {
  dbName: process.env.ORM__DATABASE_NAME,
  debug: process.env.NODE_ENV === "development",
  driverOptions:
    process.env.NODE_ENV !== "development"
      ? {
          connection: {
            ssl: { rejectUnauthorized: false },
          },
        }
      : {},
  entities: [UserV1],
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
  host: process.env.ORM__DATABASE_HOST,
  password: process.env.ORM__DATABASE_PASSWORD,
  port: Number.parseInt(process.env.ORM__DATABASE_PORT ?? "", 10),
  type: "postgresql",
  user: process.env.ORM__DATABASE_USERNAME,
} as Options;
