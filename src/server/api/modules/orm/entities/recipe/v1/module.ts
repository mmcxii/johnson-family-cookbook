import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { RecipeV1 } from "./entity";
import { RecipeV1Service } from "./service";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [RecipeV1] })],
  providers: [RecipeV1Service],
  exports: [RecipeV1Service],
})
export class RecipeV1Module {}
