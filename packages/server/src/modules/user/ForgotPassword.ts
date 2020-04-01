import { Resolver, Mutation, Arg } from "type-graphql";

import { UserResponse } from "./common/UserResponse";
import { User } from "../../entities/User";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => UserResponse)
  async forgotPassword(@Arg("email") email: string): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        status: "ERROR",
        message: "No user with that email was found.",
        payload: {
          user: null,
        },
      };
    }
  }
}
