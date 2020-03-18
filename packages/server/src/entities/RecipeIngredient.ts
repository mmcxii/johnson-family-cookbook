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
  @Field(() => [Recipe])
  @ManyToMany(
    () => Recipe,
    (r) => r.ingredients,
  ) // Relationship owned by Recipe
  usedInRecipes: Recipe[];
  /* End Relational Columns */
}
