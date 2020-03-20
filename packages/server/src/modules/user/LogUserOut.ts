import { Resolver, Mutation } from "type-graphql";

import { UserResolverReturn } from "./common/UserResolverReturn";

@Resolver()
export class LogUserOutResolver {
  @Mutation(() => UserResolverReturn)
  async logUserOut(): Promise<UserResolverReturn> {
    // TODO: Delete refresh cookie stored in JWT

    return {
      _status: "SUCCESS",
      message: "Successfully logged out.",
      payload: null,
    };
  }
}
