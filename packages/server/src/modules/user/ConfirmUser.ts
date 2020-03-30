import { Resolver, Mutation, Arg } from "type-graphql";

import { UserAccountStatusEnum } from "../../types/user.types";
import { User } from "../../entities/User";
import { UserResponse } from "./common/UserResponse";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => UserResponse)
  async confirmUser(@Arg("userId") userId: string): Promise<UserResponse> {
    const user = await User.findOne({ where: { _externalId_: userId } });
    if (!user) {
      return {
        status: "ERROR",
        message: "No account was found.",
        payload: null,
      };
    }

    await User.update(
      { _externalId_: userId },
      { confirmationStatus: UserAccountStatusEnum.Confirmed },
    );
    await user.reload();

    if (user.confirmationStatus !== UserAccountStatusEnum.Confirmed) {
      return {
        status: "ERROR",
        message:
          "An unexpected error occured confirming your account. Please try again.",
        payload: null,
      };
    }

    return {
      status: "SUCCESS",
      message: "Account confirmed successfully.",
      payload: user,
    };
  }
}
