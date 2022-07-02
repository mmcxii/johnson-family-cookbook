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
  const protocol = `redis${getHostingEnv() === "localhost" ? "" : "s"}`;
  const auth = `${getRedisUsername()}:${getRedisPassword()}`;
  const host = `${getRedisHost()}:${getRedisPort()}`;

  return {
    url: `${protocol}://${auth}@${host}`,
  };
});
