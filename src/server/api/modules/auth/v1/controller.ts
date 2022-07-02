import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { FormSchema } from "../../../../../shared/types/form-schema.type";
import { UserV1 } from "../../orm";
import { CreateTokensResponse, LoginInput, LoginResponse, RegisterUserInput } from "./dto";
import { AccessTokenGuard, RefreshTokenGuard } from "./guards";
import { AuthenticationV1Service, RegistrationV1Service, UiV1Service } from "./services";
import { AuthV1Messages } from "./utils/message-codes";
import { AuthV1Routes } from "./utils/routes";

@Controller("/auth/v1")
export class AuthV1Controller {
  constructor(
    private readonly uiV1Service: UiV1Service,
    private readonly authenticationV1Service: AuthenticationV1Service,
    private readonly registrationV1Service: RegistrationV1Service,
  ) {}

  //* Public Routes
  @Get(AuthV1Routes.LoginSchema)
  public getLoginFormSchema(): FormSchema {
    const schema = this.uiV1Service.getLoginFormSchema();

    return schema;
  }

  @Post(AuthV1Routes.Login)
  public async login(@Body() params: LoginInput): Promise<LoginResponse> {
    const response = await this.authenticationV1Service.login(params);

    return response;
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
