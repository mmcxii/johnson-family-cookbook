import { Resolver, Query, Arg } from "type-graphql";

import { UserResponse } from "./common/UserResponse";
import { findUserWithRelations } from "./utils/findUserWithRelations";
import { capitalizeString } from "../../utils/capitalizeString";

@Resolver()
export class GetUserByIdResolver {
  @Query(() => UserResponse)
  async getUserById(@Arg("userId") userId: string): Promise<UserResponse> {
    /**
     * Find the requested user.
     */
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
      message: `Loading ${capitalizeString(user.firstName)}'s profile.`,
      payload: {
        user,
      },
    };
  }
}
