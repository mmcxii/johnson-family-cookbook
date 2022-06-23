import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserV1 } from "./entity";
import { UserV1Service } from "./service";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserV1] })],
  providers: [UserV1Service],
  exports: [UserV1Service],
})
export class UserV1Module {}
