import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { UserResolverReturn } from "./common/UserResolverReturn";
import { CreateUserInput } from "./createUser/CreateUserInput";
import { User } from "../../entities/User";
import { PASSWORD_SALT } from "../../constants/envVariables";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => UserResolverReturn)
  async createUser(
    @Arg("data") data: CreateUserInput,
  ): Promise<UserResolverReturn> {
    /* Confirm that the email the user has entered is not already in use */
    const validEmail = await User.find({ where: { email: data.email } });
    if (!validEmail) {
      return {
        _status: "ERROR",
        message: "That email is in use, please enter a valid email.",
        payload: null,
      };
    }

    /* Hash the user's password */
    const hashedPassword = await bcrypt.hash(data.password, PASSWORD_SALT!);

    console.log({ hashedPassword });

    /* Confirm the account was created successfully */
    const user = await User.create({
      ...data,
      password: hashedPassword, // Overwrite with the hashed password
    }).save();
    if (!user) {
      return {
        _status: "ERROR",
        message: "There was an error creating your account, please try again.",
        payload: null,
      };
    }

    /* All checks have passed, the account may be returned */
    return {
      _status: "SUCCESS",
      message:
        "Your account has been created. Please check your email to confirm your account.",
      payload: user,
    };
  }
}
