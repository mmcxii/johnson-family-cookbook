import { Resolver, Query, Arg } from "type-graphql";

import { User } from "../../entities/User";
import { UserResolverReturn } from "./common/UserResolverReturn";

@Resolver()
export class GetUserByIdResolver {
  @Query(() => UserResolverReturn)
  async getUserById(@Arg("id") id: number): Promise<UserResolverReturn> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        _status: "ERROR",
        message: "The requested user was not found.",
        payload: null,
      };
    }

    return {
      _status: "SUCCESS",
      message: "Found requested user successfully.",
      payload: user,
    };
  }
}
