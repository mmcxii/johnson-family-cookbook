import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { UserResolverReturn } from "./common/UserResolverReturn";
import { User } from "../../entities/User";
import { PASSWORD_SALT } from "../../constants/envVariables";
import { capitalizeString } from "../../utils/capitalizeString";

@Resolver()
export class LogUserInResolver {
  @Mutation(() => UserResolverReturn)
  async logUserIn(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<UserResolverReturn> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        _status: "ERROR",
        message: "Email or password was incorrect.",
        payload: null,
      };
    }

    const isValid = await bcrypt.compare(password, PASSWORD_SALT!);
    if (!isValid) {
      return {
        _status: "ERROR",
        message: "Email or password was incorrect.",
        payload: null,
      };
    }

    // TODO: Build authentication with JWT

    return {
      _status: "SUCCESS",
      message: `Welcome back ${capitalizeString(user.firstName)}!`,
      payload: user,
    };
  }
}
