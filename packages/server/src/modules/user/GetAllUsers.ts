import { Resolver, Query } from "type-graphql";
import { MultipleUserResolverReturn } from "./common/MultipleUserResolverReturn";
import { User } from "../../entities/User";

@Resolver()
export class GetAllUsersResolver {
  @Query(() => MultipleUserResolverReturn)
  async getAllUsers(): Promise<MultipleUserResolverReturn> {
    const users = await User.find();
    if (!users) {
      return {
        _status: "ERROR",
        message: "An unexpected error occured finding users. Please try again.",
        payload: null,
      };
    }

    return {
      _status: "SUCCESS",
      message: `Found ${users.length} users.`,
      payload: users,
    };
  }
}
