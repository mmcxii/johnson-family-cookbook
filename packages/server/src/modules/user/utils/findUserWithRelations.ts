import { User } from "../../../entities/User";

/**
 * Utility function to ensure that relations are consistantly loaded with users.
 */
export async function findUserWithRelations(
  params: Params,
): Promise<User | undefined> {
  return User.findOne({
    where: { ...params },
    relations: ["gender", "permissionLevel"],
  });
}

interface Params {
  email?: string;
  _externalId_?: string;
}
