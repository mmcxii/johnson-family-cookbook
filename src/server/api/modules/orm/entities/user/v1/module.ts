import { Module } from "@nestjs/common";
import { OrmV1Module } from "../../../v1";
import { UserV1Service } from "./service";

@Module({
  imports: [OrmV1Module],
  providers: [UserV1Service],
  exports: [UserV1Service],
})
export class UserV1Module {}
