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
import { STRING_DELINIATOR } from "../constants/utilities";

@ObjectType()
@Entity("recipes")
export class Recipe extends BaseEntity {
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
  name: string;

  @Column()
  directions: string;
  @Field(() => [String])
  async returnDirections(): Promise<string[]> {
    return this.directions.split(STRING_DELINIATOR);
  }

  @Field(() => String)
  @Column("text")
  category: RecipeCategory;

  /* Begin relational values */
  @Field(() => User)
  @ManyToOne(
    () => User,
    (u) => u.postedRecipes,
  )
  createdBy: User;
  /* End relational values */

  /*
    End required values
  */

  /*
    Begin optional values
  */
  @Column({ nullable: true })
  description?: string;
  @Field(() => [String])
  async returnDescription(): Promise<string[] | null> {
    return this.description ? this.description.split(STRING_DELINIATOR) : null;
  }

  @Column({ nullable: true })
  notes?: string;
  @Field(() => [String])
  async returnNotes(): Promise<string[] | null> {
    return this.notes ? this.notes.split(STRING_DELINIATOR) : null;
  }

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Store image in s3
  /*
    End optional values
  */

  /*
    Begin external values
  */
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

  @Field(() => [RecipeIngredient])
  @ManyToMany(() => RecipeIngredient)
  @JoinTable()
  ingredients: RecipeIngredient[];

  @Field(() => [RecipeComment], { defaultValue: [] })
  @OneToMany(
    () => RecipeComment,
    (rc) => rc.recipe,
  )
  comments: RecipeComment[];
  /*
    End external values
  */
}
