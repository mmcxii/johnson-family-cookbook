import { SanitizedUser } from "../types/sanitized-user";

export class LoginResponse {
  public user: SanitizedUser;

  public accessToken: string;

  public refreshToken: string;
}
