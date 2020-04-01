import { Resolver, Query, Arg } from "type-graphql";

import { UserResponse } from "./common/UserResponse";
import { findUserWithRelations } from "./utils/findUserWithRelations";

@Resolver()
export class GetUserByIdResolver {
  @Query(() => UserResponse)
  async getUserById(@Arg("userId") userId: string): Promise<UserResponse> {
    const user = await findUserWithRelations({ externalId: userId });
    if (!user) {
      return {
        status: "ERROR",
        message: "The requested user could not be found.",
        payload: {
          user: null,
        },
      };
    }

    return {
      status: "SUCCESS",
      message: `Loading ${user.firstName}'s profile.`,
      payload: {
        user,
      },
    };
  }
}
