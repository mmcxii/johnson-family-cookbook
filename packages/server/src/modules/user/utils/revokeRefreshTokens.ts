import { getConnection } from "typeorm";
import { User } from "../../../entities/User";

export const revokeRefreshTokens = async (userId: string) => {
  try {
    await getConnection()
      .getRepository(User)
      .increment({ externalId: userId }, "tokenVersion", 1);

    return true;
  } catch (err) {
    return false;
  }
};
