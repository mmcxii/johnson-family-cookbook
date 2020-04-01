import { sign } from "jsonwebtoken";
import { Response } from "express";

import { User } from "../../../entities/User";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../../constants/envVariables";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user._externalId_ }, // eslint-disable-line no-underscore-dangle
    ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    },
  );
};

export const createRefreshToken = (user: User) => {
  // eslint-disable-next-line no-underscore-dangle
  return sign({ userId: user._externalId_ }, REFRESH_TOKEN_SECRET!, {
    expiresIn: "1y",
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME!, token, {
    httpOnly: true,
  });
};
