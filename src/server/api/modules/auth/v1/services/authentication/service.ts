import { Response } from "express";
import { Inject, Injectable } from "@nestjs/common";
import { UserV1, UserV1AccountStatus, UserV1Service } from "../../../../orm";
import { CreateTokensResponse, LoginInput, LoginResponse } from "../../dto";
import { AuthV1Errors } from "../../utils/message-codes";
import { CredentialsV1Service } from "../credentials";
import { PasswordsV1Service } from "../passwords";
import { ConfigType } from "@nestjs/config";
import { jwtConfig } from "../../config/jwt";

@Injectable()
export class AuthenticationV1Service {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly userV1Service: UserV1Service,
    private readonly credentialsV1Service: CredentialsV1Service,
    private readonly passwordsV1Service: PasswordsV1Service,
  ) {}

  public async login(params: LoginInput): Promise<LoginResponse> {
    const { emailAddress, password } = params;

    // Find the user attempting to log in
    const user = await this.userV1Service.findOneByEmailAddressOrFail(emailAddress);

    // Determine if the provided password matches the password stored in the database
    await this.passwordsV1Service.verify(password, user.password);

    // Confirm the user's account is active
    this._confirmUserIsActive(user);

    // Create an access token for the user
    const { accessToken, refreshToken } = await this.createNewTokens(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public logout(response: Response): void {
    response.clearCookie(this.config.refreshToken.cookieName);
  }

  public async createNewTokens(user: UserV1): Promise<CreateTokensResponse> {
    // Confirm the user's account is active
    this._confirmUserIsActive(user);

    const [accessToken, refreshToken] = await Promise.all([
      this.credentialsV1Service.createAccessToken(user),
      this.credentialsV1Service.createRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public attachRefreshTokenToResponseCookie(refreshToken: string, response: Response): void {
    response.cookie(
      this.config.refreshToken.cookieName,
      refreshToken,
      this.config.refreshToken.cookieConfig,
    );
  }

  private _confirmUserIsActive(user: UserV1): void {
    // If the user's account is not active reject the request
    if (user.accountStatus === UserV1AccountStatus.Disabled) {
      throw new Error(AuthV1Errors.UserNotActive);
    }
  }
}
