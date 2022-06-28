import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserV1Module } from "../../orm";
import { jwtConfig } from "./config/jwt";
import { passwordsConfig } from "./config/passwords";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./guards";
import {
  AuthenticationV1Service,
  UiV1Service,
  CredentialsV1Service,
  PasswordsV1Service,
  RegistrationV1Service,
} from "./services";

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(passwordsConfig),
    JwtModule.register({}),
    UserV1Module,
  ],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthenticationV1Service,
    CredentialsV1Service,
    PasswordsV1Service,
    RegistrationV1Service,
    UiV1Service,
  ],
})
export class AuthV1Module {}
