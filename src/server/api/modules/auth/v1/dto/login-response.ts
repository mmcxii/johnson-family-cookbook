import { UserV1 } from "../../../orm";

export class LoginResponse {
  public user: UserV1;

  public accessToken: string;

  public refreshToken: string;
}
