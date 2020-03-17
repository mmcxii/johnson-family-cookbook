import { ObjectType, Field, ID, Float } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Recipe } from "./Recipe";

@ObjectType()
@Entity("recipe_ingredients")
export class RecipeIngredients extends BaseEntity {
  /* Begin Generated Columns */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  /* End Generated Columns */

  /* Begin Columns needed to create entity */
  @Field(() => Float)
  @Column()
  quantity: number;

  @Field()
  @Column()
  unit: string;

  @Field()
  @Column()
  name: string;
  /* End Columns needed to create entity */

  /* Begin Relational Columns */
  // TODO: Add Recipe relation
  @Field()
  @Column()
  usedInRecipes: Recipe[];
  /* End Relational Columns */
}
