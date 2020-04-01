import { Resolver, Mutation, Arg } from "type-graphql";

import { UserResponse } from "./common/UserResponse";
import { User } from "../../entities/User";
import { UserAccountStatusEnum } from "../../types/user.types";
import { revokeRefreshTokens } from "./utils/revokeRefreshTokens";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmai";
import { createResetPasswordUrl } from "../utils/createResetPasswordUrl";

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

    await User.update(
      { email },
      { accountStatus: UserAccountStatusEnum.Disabled },
    );

    await revokeRefreshTokens(user.externalId);

    await sendResetPasswordEmail(
      user.email,
      createResetPasswordUrl(user.externalId),
    );

    return {
      status: "SUCCESS",
      message:
        "Your account has been disabled. Please check your email for a link to reset your password.",
      payload: {
        user: null,
      },
    };
  }
}
