import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { CookieOptions } from "express";
import { JWT_FIFTEEN_MINUTES, JWT_SEVEN_DAYS } from "../../../../../../shared/time-values";
import {
  getAccessTokenSecret,
  getHostingEnv,
  getRefreshTokenCookieName,
  getRefreshTokenSecret,
} from "../../../../../shared/env";

export type JwtConfig = {
  accessToken: {
    secret: JwtSignOptions["secret"];
    lifespan: JwtSignOptions["expiresIn"];
  };
  refreshToken: {
    cookieName: string;
    cookieConfig: CookieOptions;
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
      cookieName: getRefreshTokenCookieName(),
      secret: getRefreshTokenSecret(),
      lifespan: JWT_SEVEN_DAYS,
      cookieConfig: {
        // Only allow cookie to be accessed over HTTP
        httpOnly: true,
        // Use HTTPS in production
        secure: getHostingEnv() !== "localhost",
        // Cookie is valid for one week after creation
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // Cookie is valid for all subdomains of the host domain
        domain: getHostingEnv() !== "localhost" ? "jfcb.app" : "localhost",
      },
    },
  };
});
