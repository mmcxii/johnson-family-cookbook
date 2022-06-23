import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import mikroOrmConfig from "./utils/config";

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
  exports: [MikroOrmModule],
})
export class OrmV1Module {}
