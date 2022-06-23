import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserV1Module } from "../../orm";
import { jwtConfig } from "./config/jwt";
import { CredentialsV1Service } from "./services";

@Module({
  imports: [ConfigModule.forFeature(jwtConfig), JwtModule.register({}), UserV1Module],
  providers: [CredentialsV1Service],
})
export class AuthV1Module {}
