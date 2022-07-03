import pino from "pino-http";

export function loggerMiddleware() {
  return pino();
}
