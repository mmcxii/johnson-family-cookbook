import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { JWT_FIFTEEN_MINUTES, JWT_SEVEN_DAYS } from "../../../../../../shared/time-values";
import { getAccessTokenSecret, getRefreshTokenSecret } from "../../../../../shared/env";

export type JwtConfig = {
  accessToken: {
    secret: JwtSignOptions["secret"];
    lifespan: JwtSignOptions["expiresIn"];
  };
  refreshToken: {
    secret: JwtSignOptions["secret"];
    lifespan: JwtSignOptions["expiresIn"];
  };
};

export const jwtConfig = registerAs("jwt", (): JwtConfig => {
  return {
    accessToken: {
      secret: getAccessTokenSecret(),
      lifespan: JWT_FIFTEEN_MINUTES,
    },
    refreshToken: {
      secret: getRefreshTokenSecret(),
      lifespan: JWT_SEVEN_DAYS,
    },
  };
});
