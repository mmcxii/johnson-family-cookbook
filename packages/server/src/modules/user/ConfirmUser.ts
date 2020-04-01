import { Resolver, Mutation, Arg } from "type-graphql";

import { UserAccountStatusEnum } from "../../types/user.types";
import { User } from "../../entities/User";
import { UserResponse } from "./common/UserResponse";
import { findUserWithRelations } from "./utils/findUserWithRelations";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => UserResponse)
  async confirmUser(@Arg("userId") userId: string): Promise<UserResponse> {
    /**
     * Check for the presence of the user requesting confirmation.
     */
    const user = await findUserWithRelations({ externalId: userId });
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
     * If the use has already confirmed their account the operation can
     * be exited early.
     */
    if (user.accountStatus !== UserAccountStatusEnum.NotConfirmed) {
      return {
        status: "ERROR",
        message: "Your account has already been confirmed.",
        payload: {
          user: null,
        },
      };
    }

    /**
     * Once all checks have passed the user's confirmation status is set to "ACTIVE"
     * and the account information is reloaded.
     */
    await Promise.all([
      User.update(
        { externalId: userId },
        { accountStatus: UserAccountStatusEnum.Active },
      ),
      user.reload(),
    ]);

    /**
     * If for any reason the database is not updated the user is informed of the error
     * and asked to reattempt their confirmation.
     *
     * This line is ignored by TypeScript because it is assumed that the value will be true
     * based on the final check before the user is updated in the database. This checking
     * is desired because it will catch unexpected errors coming from the database or ORM.
     */
    // @ts-ignore
    if (user.accountStatus !== UserAccountStatusEnum.Active) {
      return {
        status: "ERROR",
        message:
          "An unexpected error occured confirming your account. Please try again.",
        payload: {
          user: null,
        },
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
      payload: {
        user,
      },
    };
  }
}
