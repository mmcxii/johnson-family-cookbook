import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";
import { Recipe } from "./Recipe";

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
  /* End Columns needed to create entity */

  /* Begin Columns Relational Columns */
  @Field(() => User)
  @ManyToOne(
    () => User,
    (u) => u.comments,
  )
  author: User;

  @Field(() => Recipe)
  @ManyToOne(
    () => Recipe,
    (r) => r.comments,
  )
  recipe: Recipe;
  /* End Columns Relational Columns */
}
