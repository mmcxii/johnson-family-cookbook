import { faker } from "@faker-js/faker";
import { Provider } from "@nestjs/common";
import { RedisService } from "nestjs-redis";

export const mockRedisService: Provider = {
  provide: RedisService,
  useValue: {
    getClient(): any {
      return {
        async set(): Promise<"OK"> {
          return "OK";
        },
        async get(): Promise<string> {
          return faker.random.alphaNumeric();
        },
      };
    },
  },
};
