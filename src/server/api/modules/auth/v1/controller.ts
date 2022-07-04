import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../../../shared/constants/http-status-codes";
import { FormSchema } from "../../../../../shared/types/form-schema.type";
import { UserV1 } from "../../orm";
import { CreateTokensResponse, LoginInput, LoginResponse, RegisterUserInput } from "./dto";
import { AccessTokenGuard, RefreshTokenGuard } from "./guards";
import {
  AuthenticationV1Service,
  CredentialsV1Service,
  RegistrationV1Service,
  UiV1Service,
} from "./services";
import { SanitizedUser } from "./types/sanitized-user";
import { AuthV1Messages } from "./utils/message-codes";
import { AuthV1Routes } from "./utils/routes";
import { sanitizeUser } from "./utils/sanitize-user";

@Controller("/auth/v1")
export class AuthV1Controller {
  constructor(
    private readonly uiV1Service: UiV1Service,
    private readonly authenticationV1Service: AuthenticationV1Service,
    private readonly registrationV1Service: RegistrationV1Service,
    private readonly credentailsV1Service: CredentialsV1Service,
  ) {}

  //* Public Routes
  @Get(AuthV1Routes.LoginSchema)
  public getLoginFormSchema(): FormSchema {
    const schema = this.uiV1Service.getLoginFormSchema();

    return schema;
  }

  @Post(AuthV1Routes.Login)
  @HttpCode(HttpStatusCodes.Success)
  public async login(
    @Body() params: LoginInput,
    @Res() response: Response, // : Promise<LoginResponse>
  ) {
    const data = await this.authenticationV1Service.login(params);
    this.credentailsV1Service.attachRefreshTokenToResponse(response, data.refreshToken);

    return response.json(data);
  }

  @Get(AuthV1Routes.RegisterUserSchema)
  public getRegisterUserFormSchema(): FormSchema {
    const schema = this.uiV1Service.getRegisterUserFormSchema();

    return schema;
  }

  @Post(AuthV1Routes.RegisterUser)
  public async registerUser(@Body() params: RegisterUserInput): Promise<LoginResponse> {
    const response = await this.registrationV1Service.registerUser(params);

    return response;
  }

  //* Private Routes
  @UseGuards(AccessTokenGuard)
  @Get(AuthV1Routes.User)
  public async getCurrentUser(@Req() request: Request): Promise<SanitizedUser> {
    const user = sanitizeUser(request.user as UserV1);

    return user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post(AuthV1Routes.RefreshTokens)
  public async refreshTokens(@Req() request: Request): Promise<CreateTokensResponse> {
    const user = request.user as UserV1;

    const tokens = await this.authenticationV1Service.createNewTokens(user);

    return tokens;
  }

  @UseGuards(AccessTokenGuard)
  @Post(AuthV1Routes.Logout)
  public logout(@Res() response: Response): string {
    this.authenticationV1Service.logout(response);

    return AuthV1Messages.LogoutSuccessful;
  }
}
