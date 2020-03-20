import { Resolver, Mutation, Arg } from "type-graphql";

import { UserResolverReturn } from "./common/UserResolverReturn";
import { User } from "../../entities/User";

@Resolver()
export class ReactivateUserResolver {
  @Mutation(() => UserResolverReturn)
  async reactivateUser(
    @Arg("userToReactivateId") userToReactivateId: number,
  ): Promise<UserResolverReturn> {
    const userToReactivate = await User.findOne({
      where: { id: userToReactivateId },
    });
    if (!userToReactivate) {
      return {
        _status: "ERROR",
        message: "The requested user could not be found.",
        payload: null,
      };
    }
    if (userToReactivate._status !== "DISABLED") {
      return {
        _status: "ERROR",
        message: "The requested user's account is not disabled.",
        payload: userToReactivate,
      };
    }

    // TODO: Validate request is coming from an admin

    await User.update({ id: userToReactivateId }, { _status: "ACTIVE" });
    await userToReactivate.reload();

    return {
      _status: "SUCCESS",
      message: "User was successfully reactivated.",
      payload: userToReactivate,
    };
  }
}
