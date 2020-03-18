import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import {
  UserGender,
  UserConfirmationStatus,
  UserPermissionLevel,
  UserRequiredValues,
} from "../types/User";

import { Recipe } from "./Recipe";
import { Menu } from "./Menu";
import { RecipeComment } from "./RecipeComment";

@ObjectType()
@Entity("users")
export class User extends BaseEntity implements UserRequiredValues {
  /* Begin Generated Columns */
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  joinedAt: Date;

  @Field(() => String)
  @Column("text", { default: "NOT_CONFIRMED" })
  _confirmationStatus: UserConfirmationStatus;

  @Field(() => String)
  @Column("text", { default: "USER" })
  _userPermissionLevel: UserPermissionLevel;
  /* End Generated Columns */

  /* Begin Columns needed to create entity */
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  // Password is not accessable as a field
  @Column()
  password: string;

  @Field()
  @Column()
  birthday: Date;

  @Field(() => String)
  @Column("text")
  gender: UserGender;
  /* End Columns needed to create entity */

  /* Begin optional Columns */
  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Save user images in S3
  /* End optional Columns */

  /* Begin Relational Columns */
  // Recipe relations
  @Field(() => [Recipe], { defaultValue: [] })
  @ManyToMany(
    () => Recipe,
    (r) => r.favoritedBy,
  )
  @JoinTable()
  favorites: Recipe[];

  @Field(() => [Recipe], { defaultValue: [] })
  @OneToMany(
    () => Recipe,
    (r) => r.createdBy,
  )
  postedRecipes: Recipe[];

  // RecipeComment relations
  @Field(() => [RecipeComment], { defaultValue: [] })
  @OneToMany(
    () => RecipeComment,
    (rc) => rc.author,
  )
  comments: RecipeComment[];

  // Menu relations
  @Field(() => [Menu], { defaultValue: [] })
  @OneToMany(
    () => Menu,
    (m) => m.createdBy,
  )
  menus: Menu[];
  /* End Relational Columns */
}
