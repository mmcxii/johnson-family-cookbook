import { Resolver, Mutation, Arg } from "type-graphql";

import { UserResolverReturn } from "./common/UserResolverReturn";
import { User } from "../../entities/User";

@Resolver()
export class DisableUserResolver {
  @Mutation(() => UserResolverReturn)
  async disableUser(
    @Arg("userToDisableId") userToDisableId: number,
  ): Promise<UserResolverReturn> {
    const userToDisable = await User.findOne({
      where: { id: userToDisableId },
    });
    if (!userToDisable) {
      return {
        _status: "ERROR",
        message: "The requested user could not be found.",
        payload: null,
      };
    }
    if (userToDisable._status === "DISABLED") {
      return {
        _status: "ERROR",
        message: "The requested user's account is already disabled.",
        payload: userToDisable,
      };
    }

    // TODO: Validiate request is coming from an admin

    await User.update({ id: userToDisableId }, { _status: "DISABLED" });
    await userToDisable.reload();

    return {
      _status: "SUCCESS",
      message: "User was successfully disabled.",
      payload: userToDisable!,
    };
  }
}
