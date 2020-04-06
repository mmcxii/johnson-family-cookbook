import { Resolver, Query } from "type-graphql";

import { MultipleUserResponse } from "./common/MultipleUserResponse";
import { User } from "../../entities/User";

@Resolver()
export class GetAllUsersResolver {
  @Query(() => MultipleUserResponse)
  async getAllUsers(): Promise<MultipleUserResponse> {
    const users = await User.find({
      relations: ["gender", "permissionLevel"],
    });
    return {
      status: "SUCCESS",
      message: `Found ${users.length} users.`,
      users,
    };
  }
}
