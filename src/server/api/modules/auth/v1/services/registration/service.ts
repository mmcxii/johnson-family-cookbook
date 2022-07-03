import { Injectable } from "@nestjs/common";
import { UserV1Service } from "../../../../orm";
import { LoginResponse, RegisterUserInput } from "../../dto";
import { AuthV1Errors } from "../../utils/message-codes";
import { sanitizeUser } from "../../utils/sanitize-user";
import { AuthenticationV1Service } from "../authentication";
import { PasswordsV1Service } from "../passwords";

@Injectable()
export class RegistrationV1Service {
  constructor(
    private readonly userV1Service: UserV1Service,
    private readonly passwordsV1Service: PasswordsV1Service,
    private readonly authenticationV1Service: AuthenticationV1Service,
  ) {}

  public async registerUser(params: RegisterUserInput): Promise<LoginResponse> {
    const { confirmPassword, password } = params;

    if (password !== confirmPassword) {
      throw new Error(AuthV1Errors.PasswordsMustMatch);
    }

    const hashedPassword = await this.passwordsV1Service.hash(password);
    const user = await this.userV1Service.createAndFlush({
      ...params,
      password: hashedPassword,
    });
    const tokens = await this.authenticationV1Service.createNewTokens(user);

    return {
      ...tokens,
      user: sanitizeUser(user),
    };
  }
}
