import { registerAs } from "@nestjs/config";
import { RedisModuleOptions } from "nestjs-redis";
import {
  getHostingEnv,
  getRedisHost,
  getRedisPassword,
  getRedisPort,
  getRedisUsername,
} from "../../../../../shared/env";

export type RedisConfig = RedisModuleOptions & {};

export const redisConfig = registerAs("redis", (): RedisConfig => {
  return {
    url: `redis${
      getHostingEnv() === "localhost" ? "" : "s"
    }://${getRedisUsername()}:${getRedisPassword()}@${getRedisHost()}:${getRedisPort()}`,
  };
});
