import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import { RecipeCategory } from "../types/Recipe";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeComment } from "./RecipeComment";

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

  @Field(() => [String])
  @Column()
  directions: string[];

  @Field(() => RecipeCategory)
  @Column({ type: "enum", enum: RecipeCategory })
  category: RecipeCategory;

  @Field(() => User)
  @Column()
  createdBy: User;
  /* End Columns needed to create entity */

  /* Begin optional Columns */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field(() => [String])
  @Column({ nullable: true })
  notes?: string[];

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Store image in s3
  /* End optional Columns */

  /* Begin Relational columns */
  // User relations
  @Field(() => [User])
  @ManyToMany(
    () => User,
    (u) => u.favorites,
  ) // Relationship owned by User
  favoritedBy: User[];

  @ManyToMany(() => User)
  @JoinTable()
  upvotedBy: User[];
  @Field(() => Int)
  async upvoteCount(): Promise<number> {
    return this.upvotedBy.length;
  }

  @ManyToMany(() => User)
  @JoinTable()
  downvotedBy: User[];
  @Field(() => Int)
  async downvoteCount(): Promise<number> {
    return this.downvotedBy.length;
  }

  // RecipeIngredient relations
  @Field(() => [RecipeIngredient])
  @ManyToMany(() => RecipeIngredient)
  @JoinTable()
  ingredients: RecipeIngredient[];

  // RecipeComment relations
  @Field(() => [RecipeComment])
  @OneToMany(
    () => RecipeComment,
    (rc) => rc.recipe,
  )
  comments: RecipeComment[];
  /* End relational columns */
}
