import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

import { RecipeCategory } from "../types/Recipe";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeComment } from "./RecipeComment";
import { Menu } from "./Menu";

@ObjectType()
@Entity("recipes")
export class Recipe extends BaseEntity {
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
  name: string;

  @Field()
  @Column()
  directions: string[];

  @Field()
  @Column({ type: "enum", enum: RecipeCategory })
  category: RecipeCategory;

  @Field()
  @Column()
  ingredients: RecipeIngredient[]; // TODO: Add relation

  @Field()
  @Column()
  createdBy: User;
  /* End Columns needed to create entity */

  /* Begin optional Columns */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: true })
  notes?: string[];

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Store image in s3
  /* End optional Columns */

  /* Begin Relational columns */
  // User relations
  // TODO: Add User relations
  @Field()
  @Column()
  favoritedBy: User[];

  @Field()
  @Column()
  upvotedBy: User[];

  @Field()
  @Column()
  downvotedBy: User[];

  // RecipeComment relations
  // TODO: Add relation
  @Field()
  @Column()
  comments: RecipeComment[];

  // Menu relations
  // TODO: replace with replace with Menu and add relation
  @Field()
  @Column()
  inMenus: Menu[];
  /* End relational columns */
}
