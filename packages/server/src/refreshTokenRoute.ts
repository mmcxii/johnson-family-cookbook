import { Router } from "express";
import { verify } from "jsonwebtoken";

import { REFRESH_TOKEN_SECRET } from "./constants/envVariables";
import { User } from "./entities/User";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "./modules/user/utils/auth";

export const refreshTokenRoute = Router().post("/", async (req, res) => {
  /**
   * Extract the token from the request cookies.
   */
  const token = req.cookies.rtc;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  /**
   * Verify the validity of the token against the secret.
   */
  let payload: any | null = null;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET!);
  } catch (err) {
    return res.send({ ok: false, accessToken: "" });
  }

  /**
   * Find the user the token belongs to.
   */
  const user = await User.findOne({
    where: { externalId: payload.userId },
  });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  /**
   * Verify the token's version is correct.
   */
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  /**
   * Generate a new set of tokens for the user.
   */
  sendRefreshToken(res, createRefreshToken(user));
  const accessToken = createAccessToken(user);

  return res.send({ ok: true, accessToken });
});
