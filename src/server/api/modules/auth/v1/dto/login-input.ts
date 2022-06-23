import { UserV1 } from "../../../orm";

export class LoginInput {
  public emailAddress: UserV1["emailAddress"];

  public password: UserV1["password"];
}
