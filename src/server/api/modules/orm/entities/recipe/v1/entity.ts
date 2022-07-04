import { Entity, Property } from "@mikro-orm/core";
import { _BaseEntity } from "../../base-entity";

@Entity()
export class RecipeV1 extends _BaseEntity {
  @Property()
  public title: string;

  @Property()
  public description: undefined | string;

  @Property()
  public ingredients: Array<string>;

  @Property()
  public instructions: Array<string>;
}
