import { sign } from "jsonwebtoken";

import { User } from "../../../entities/User";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
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
