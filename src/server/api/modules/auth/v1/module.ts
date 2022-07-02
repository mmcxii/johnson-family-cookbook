import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "nestjs-redis";
import { UserV1Module } from "../../orm";
import { jwtConfig } from "./config/jwt";
import { passwordsConfig } from "./config/passwords";
import { redisConfig } from "./config/redis";
import { AuthV1Controller } from "./controller";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./guards";
import {
  AuthenticationV1Service,
  CredentialsV1Service,
  PasswordsV1Service,
  RegistrationV1Service,
  UiV1Service,
} from "./services";

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(passwordsConfig),
    ConfigModule.forFeature(redisConfig),
    JwtModule.register({}),
    // RedisModule.forRootAsync({
    //   useFactory: redisConfig,
    // }),
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
  controllers: [AuthV1Controller],
})
export class AuthV1Module {}
