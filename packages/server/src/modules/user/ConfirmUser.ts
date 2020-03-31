import { Resolver, Mutation, Arg } from "type-graphql";

import { UserAccountStatusEnum } from "../../types/user.types";
import { User } from "../../entities/User";
import { UserResponse } from "./common/UserResponse";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => UserResponse)
  static async confirmUser(
    @Arg("userId") userId: string,
  ): Promise<UserResponse> {
    /**
     * Check for the presence of the user requesting confirmation.
     */
    const user = await User.findOne({ where: { _externalId_: userId } });
    if (!user) {
      return {
        status: "ERROR",
        message: "No account was found.",
        payload: null,
      };
    }

    /**
     * If the use has already confirmed their account the operation can
     * be exited early.
     */
    if (user.confirmationStatus !== UserAccountStatusEnum.NotConfirmed) {
      return {
        status: "ERROR",
        message: "Your account has already been confirmed.",
        payload: null,
      };
    }

    /**
     * Once all checks have passed the user's confirmation status is set to "CONFIRMED"
     */
    await User.update(
      { _externalId_: userId },
      { confirmationStatus: UserAccountStatusEnum.Confirmed },
    );
    await user.reload();

    /**
     * If for any reason the database is not updated the user is informed of the error
     * and asked to reattempt their confirmation.
     *
     * This line is ignored by TypeScript because it is assumed that the value will be true
     * based on the final check before the user is updated in the database. This checking
     * is desired because it will catch unexpected errors coming from the database or ORM.
     */
    // @ts-ignore
    if (user.confirmationStatus !== UserAccountStatusEnum.Confirmed) {
      return {
        status: "ERROR",
        message:
          "An unexpected error occured confirming your account. Please try again.",
        payload: null,
      };
    }

    /**
     * Once all checks have passed the user is informed that their account is now active
     * and ready for use.
     *
     * TODO: Assign tokens once JWT auth has been implemented.
     */
    return {
      status: "SUCCESS",
      message: "Account confirmed successfully.",
      payload: user,
    };
  }
}
