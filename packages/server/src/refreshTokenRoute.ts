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
  const token = req.cookies.rtc;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any | null = null;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET!);
  } catch (err) {
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await User.findOne({
    where: { externalId: payload.userId },
  });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});
