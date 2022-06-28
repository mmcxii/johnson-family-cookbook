import { UserV1 } from "../../../orm";
import { CreateUserV1Params } from "../../../orm/entities/user/v1/dto/create-params";

export class RegisterUserInput extends CreateUserV1Params {
  public confirmPassword: UserV1["password"];
}
