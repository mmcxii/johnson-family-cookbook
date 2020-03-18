import { ObjectType, Field, ID, Float } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";

import { Recipe } from "./Recipe";

@ObjectType()
@Entity("recipe_ingredients")
export class RecipeIngredient extends BaseEntity {
  /*
    Begin generated values
  */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  /* Begin Relational values */
  @Field(() => [Recipe])
  @ManyToMany(
    () => Recipe,
    (r) => r.ingredients,
  ) // Relationship owned by Recipe
  usedInRecipes: Recipe[];
  /* End Relational values */

  /*
    End generated values
  */

  /*
    Begin required values
  */
  @Field(() => Float)
  @Column()
  quantity: number;

  @Field()
  @Column()
  unit: string;

  @Field()
  @Column()
  name: string;
  /*
    End required values
  */
}
