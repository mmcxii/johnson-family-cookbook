import { Credentials } from "./credentials.type";

export type DecodedToken = Credentials & {
  iat: number;
  exp: number;
};
