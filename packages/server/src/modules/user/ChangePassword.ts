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

    const hashedNewPassword = await bcrypt.hash(newPassword, SALT!);

    await Promise.all([
      User.update({ externalId: token }, { password: hashedNewPassword }),
      user.reload(),
    ]);

    sendRefreshToken(res, createRefreshToken(user));

    return {
      status: "SUCCESS",
      message:
        "Your password has been changed successfully and you have been signed into your account.",
      payload: {
        user,
        tokens: {
          accessToken: createAccessToken(user),
        },
      },
    };
  }
}
