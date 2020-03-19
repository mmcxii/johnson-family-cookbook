import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { CreateUserInput } from "./createUser/CreateUserInput";
import { UserResolverReturn } from "./common/UserResolverReturn";
import { User } from "../../entities/User";
import { PASSWORD_SALT } from "../../constants/envVariables";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => UserResolverReturn)
  async createUser(
    @Arg("data") data: CreateUserInput,
  ): Promise<UserResolverReturn> {
    const invalidEmail = await User.findOne({ where: { email: data.email } });
    if (invalidEmail) {
      return {
        _status: "ERROR",
        message: "Email is already in use. Please select another email.",
        payload: null,
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      parseInt(PASSWORD_SALT!),
    );
    const user = await User.create({
      ...data,
      password: hashedPassword,
    }).save();
    if (!user) {
      return {
        _status: "ERROR",
        message:
          "An unexpected error occured when creating your account. Please try again.",
        payload: null,
      };
    }

    return {
      _status: "SUCCESS",
      message: "Account was successfully created.",
      payload: user,
    };
  }
}
