import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Recipe } from "./Recipe";
import { User } from "./User";

@ObjectType()
@Entity("recipe_comments")
export class RecipeComment extends BaseEntity {
  /* Begin Generated Columns */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  /* End Generated Columns */

  /* Begin Columns needed to create entity */
  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  author: User;

  @Field()
  @Column()
  recipe: Recipe;
  /* End Columns needed to create entity */

  /* Begin Columns Relational Columns */
  /* End Columns Relational Columns */
}
