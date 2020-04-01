import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { UserResponse } from "./common/UserResponse";
import { User } from "../../entities/User";
import { SALT } from "../../constants/envVariables";
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "./utils/auth";
import { MyContext } from "../../types/MyContext";
import { findUserWithRelations } from "./utils/findUserWithRelations";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { res }: MyContext,
  ): Promise<UserResponse> {
    /**
     * Confirm the account of the user attempting to reset their password.
     */
    const user = await findUserWithRelations({ externalId: token });
    if (!user) {
      return {
        status: "ERROR",
        message: "No account was found.",
        payload: {
          user: null,
        },
      };
    }

    /**
     * Secure the new password.
     */
    const hashedNewPassword = await bcrypt.hash(newPassword, SALT!);

    /**
     * Update the user with the new password and reload the reference.
     */
    await Promise.all([
      User.update({ externalId: token }, { password: hashedNewPassword }),
      user.reload(),
    ]);

    /**
     * Create and send a new set of tokens.
     */
    sendRefreshToken(res, createRefreshToken(user));
    const accessToken = createAccessToken(user);

    return {
      status: "SUCCESS",
      message:
        "Your password has been changed successfully and you have been signed into your account.",
      payload: {
        user,
        tokens: {
          accessToken,
        },
      },
    };
  }
}
