import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { UserResponse } from "./common/UserResponse";
import { LoginInput } from "./login/LoginInput";
import { UserAccountStatusEnum } from "../../types/user.types";
import { capitalizeString } from "../../utils/capitalizeString";
import { normalizeData } from "../../utils/normalizeData";
import { findUserWithRelations } from "./utils/findUserWithRelations";
import { MyContext } from "../../types/MyContext";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./utils/auth";

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse)
  async login(
    @Ctx() { res }: MyContext,
    @Arg("data") data: LoginInput,
  ): Promise<UserResponse> {
    /**
     * The user's email is normalized before the login is attempted to
     * prevent accidental rejections of correct credentials.
     */
    const { email: normailizedEmail } = normalizeData({ email: data.email });

    /**
     * A common message is stored and used should a user enter either
     * an invalid email or an invalid password. The same message is used
     * in both instances so that malicious actors are not aided in determining
     * if either of their fields were correct.
     */
    const invalidLoginCredentialsMessage = "Incorrect email or password.";

    /**
     * The user is found by their email address.
     * If no matching account is found the user is informed that their
     * credentials are incorrect.
     */
    const user = await findUserWithRelations({ email: normailizedEmail });
    if (!user) {
      return {
        status: "ERROR",
        message: invalidLoginCredentialsMessage,
        payload: {
          user: null,
        },
      };
    }

    /**
     * Users can only log in once their account has been confirmed via an email.
     * If the user has not confirmed their account they are informed and instructed to check
     * their email for the link.
     */
    if (user.accountStatus !== UserAccountStatusEnum.Active) {
      return {
        status: "ERROR",
        message:
          "You must confirm your account before loggin in. Please check your email for your verification link.",
        payload: {
          user: null,
        },
      };
    }

    /**
     * The user's password is compared against the value securely stored in the database.
     */
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return {
        status: "ERROR",
        message: invalidLoginCredentialsMessage,
        payload: {
          user: null,
        },
      };
    }

    sendRefreshToken(res, createRefreshToken(user));

    /**
     * Once all checks have passed the user is welcomed back to the app and logged in.
     */
    return {
      status: "SUCCESS",
      message: `Welcome back ${capitalizeString(user.firstName)}!`,
      payload: {
        user,
        tokens: {
          accessToken: createAccessToken(user),
        },
      },
    };
  }
}
