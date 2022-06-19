import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ALL_ENTITIES } from "./utils/all-entities";
import mikroOrmConfig from "./utils/config";

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), MikroOrmModule.forFeature(ALL_ENTITIES)],
  exports: [MikroOrmModule],
})
export class OrmV1Module {}
