import { deepCopy } from "../../../../../../shared/utils/deep-copy";
import { UserV1 } from "../../../orm";
import { SECRET_VALUES, SanitizedUser } from "../types/sanitized-user";

export function sanitizeUser(user: UserV1): SanitizedUser {
  const deepCopiedUser = deepCopy(user);
  for (const value of SECRET_VALUES) {
    delete deepCopiedUser[value];
  }

  return deepCopiedUser;
}
