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
  /*
    Begin generated values
  */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  /*
    End generated values
  */

  /*
    Begin required values
  */
  @Field()
  @Column()
  message: string;

  /* Begin relational values */
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
  /* End relational values */

  /*
    End required values
  */
}
