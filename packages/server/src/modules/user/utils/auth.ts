import { sign } from "jsonwebtoken";
import { Response } from "express";

import { User } from "../../../entities/User";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../../constants/envVariables";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.externalId }, ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.externalId, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "1y",
    },
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME!, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });
};
