import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserV1Module } from "../../orm";
import { jwtConfig } from "./config/jwt";
import { passwordsConfig } from "./config/passwords";
import { CredentialsV1Service, PasswordsV1Service } from "./services";

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(passwordsConfig),
    JwtModule.register({}),
    UserV1Module,
  ],
  providers: [CredentialsV1Service, PasswordsV1Service],
})
export class AuthV1Module {}
