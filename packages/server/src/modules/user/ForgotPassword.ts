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
    /**
     * Find and verify the requested user account.
     */
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

    /**
     * Set the account status to "DISABLED".
     */
    await User.update(
      { email },
      { accountStatus: UserAccountStatusEnum.Disabled },
    );

    /**
     * Revoke existing refresh tokens by incrementing the token version.
     */
    await revokeRefreshTokens(user.externalId);

    /**
     * Send the user's email a link to reset their password.
     */
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
