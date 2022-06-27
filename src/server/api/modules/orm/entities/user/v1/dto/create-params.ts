import { _BaseEntity } from "../../../base-entity";
import { UserV1 } from "../entity";

type CreateUserV1ParamsType = Omit<
  UserV1,
  keyof _BaseEntity | "credentialVersion" | "accountStatus"
>;

export class CreateUserV1Params implements CreateUserV1ParamsType {
  public emailAddress: UserV1["emailAddress"];
  public password: UserV1["password"];
}
