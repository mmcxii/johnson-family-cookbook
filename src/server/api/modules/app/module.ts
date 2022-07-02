import { Module } from "@nestjs/common";
import { AuthV1Module } from "../auth";
import { OrmV1Module } from "../orm";

@Module({
  imports: [OrmV1Module, AuthV1Module],
})
export class AppModule {}
