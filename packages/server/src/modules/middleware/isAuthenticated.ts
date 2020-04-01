import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { verify } from "jsonwebtoken";

import { MyContext } from "../../types/MyContext";
import { ACCESS_TOKEN_SECRET } from "../../constants/envVariables";

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const auth = context.req.headers.authorization;

  if (!auth) {
    throw new Error("Not authenticated.");
  }

  try {
    const token = auth?.split(" ")[1];
    const payload = verify(token, ACCESS_TOKEN_SECRET!);

    context.payload = payload as any; // eslint-disable-line no-param-reassign
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    throw new Error("Not authenticated.");
  }

  return next();
};
