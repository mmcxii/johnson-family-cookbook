import { Module } from "@nestjs/common";
import { OrmV1Module } from "../orm";

@Module({
  imports: [OrmV1Module],
})
export class AppModule {}
