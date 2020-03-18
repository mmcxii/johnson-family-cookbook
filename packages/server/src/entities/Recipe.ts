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
  ManyToOne,
} from "typeorm";

import { RecipeCategory } from "../types/recipe.types";
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

  @Column()
  directions: string;
  @Field(() => [String])
  async returnDirections(): Promise<string[]> {
    return this.directions.split("///");
  }

  @Field(() => String)
  @Column("text")
  category: RecipeCategory;
  /* End Columns needed to create entity */

  /* Begin optional Columns */
  @Column({ nullable: true })
  description?: string;
  @Field(() => [String])
  async returnDescription(): Promise<string[] | null> {
    return this.description ? this.description.split("///") : null;
  }

  @Column({ nullable: true })
  notes?: string;
  @Field(() => [String])
  async returnNotes(): Promise<string[] | null> {
    return this.notes ? this.notes.split("///") : null;
  }

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Store image in s3
  /* End optional Columns */

  /* Begin Relational columns */
  // User relations
  @Field(() => User)
  @ManyToOne(
    () => User,
    (u) => u.postedRecipes,
  )
  createdBy: User;

  @Field(() => [User], { defaultValue: [] })
  @ManyToMany(
    () => User,
    (u) => u.favorites,
  ) // Relationship owned by User
  favoritedBy: User[];

  @ManyToMany(() => User)
  @JoinTable()
  upvotedBy: User[];
  @Field(() => Int, { defaultValue: 0 })
  async upvoteCount(): Promise<number> {
    return this.upvotedBy.length;
  }

  @ManyToMany(() => User)
  @JoinTable()
  downvotedBy: User[];
  @Field(() => Int, { defaultValue: 0 })
  async downvoteCount(): Promise<number> {
    return this.downvotedBy.length;
  }

  // RecipeIngredient relations
  @Field(() => [RecipeIngredient])
  @ManyToMany(() => RecipeIngredient)
  @JoinTable()
  ingredients: RecipeIngredient[];

  // RecipeComment relations
  @Field(() => [RecipeComment], { defaultValue: [] })
  @OneToMany(
    () => RecipeComment,
    (rc) => rc.recipe,
  )
  comments: RecipeComment[];
  /* End relational columns */
}
