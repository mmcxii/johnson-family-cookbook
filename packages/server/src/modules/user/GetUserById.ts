import { Resolver, Query, Arg } from "type-graphql";

import { User } from "../../entities/User";
import { UserResolverReturn } from "./common/UserResolverReturn";

@Resolver()
export class GetUserByIdResolver {
  @Query(() => UserResolverReturn)
  async getUserById(@Arg("id") id: number): Promise<UserResolverReturn> {
    const user = await User.findOne(id);

    if (!user) {
      return {
        _status: "ERROR",
        message: "The requested user could not be found.",
        payload: null,
      };
    }

    return {
      _status: "SUCCESS",
      message: "User was found successfully.",
      payload: user,
    };
  }
}
