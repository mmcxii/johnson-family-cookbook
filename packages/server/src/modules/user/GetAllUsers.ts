import { Resolver, Query } from "type-graphql";

import { User } from "../../entities/User";
import { MultipleUserResolverReturn } from "./common/MultipleUserResolverReturn";

@Resolver()
export class GetAllUsersResolver {
  @Query(() => MultipleUserResolverReturn)
  async getAllUsers(): Promise<MultipleUserResolverReturn> {
    const users = await User.find({});

    if (users.length === 0) {
      return {
        _status: "ERROR",
        message: "No users were found.",
        payload: null,
      };
    }

    return {
      _status: "SUCCESS",
      message: `Successfully found ${users.length} users.`,
      payload: users,
    };
  }
}
