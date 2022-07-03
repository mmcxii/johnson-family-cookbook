import { Credentials } from "./credentials";

export type DecodedToken = Credentials & {
  exp: number;
  iat: number;
};
