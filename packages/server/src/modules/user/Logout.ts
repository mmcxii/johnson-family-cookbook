import { Resolver, Mutation, Ctx } from "type-graphql";

import { UserResponse } from "./common/UserResponse";
import { MyContext } from "../../types/MyContext";
import { REFRESH_TOKEN_COOKIE_NAME } from "../../constants/envVariables";

@Resolver()
export class LogoutResolver {
  @Mutation(() => UserResponse)
  async logout(@Ctx() { res }: MyContext): Promise<UserResponse> {
    /**
     * Clear the refresh token stored in the cookie.
     */
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME!);

    return {
      status: "SUCCESS",
      message: "Log out successful.",
      payload: {
        user: null,
      },
    };
  }
}
