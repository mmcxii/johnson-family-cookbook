import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  joinedAt: Date;

  @Field(() => UserConfirmationStatus)
  @Column({
    type: "enum",
    enum: UserConfirmationStatus,
    default: UserConfirmationStatus.NotConfirmed,
  })
  _confirmationStatus: UserConfirmationStatus;

  @Field(() => UserPermissionLevel)
  @Column({
    type: "enum",
    enum: UserPermissionLevel,
    default: UserPermissionLevel.User,
  })
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

  @Field(() => UserGender)
  @Column({ type: "enum", enum: UserGender })
  gender: UserGender;
  /* End Columns needed to create entity */

  /* Begin optional Columns */
  @Field()
  @Column()
  image?: string; // TODO: Save user images in S3
  /* End optional Columns */

  /* Begin Relational Columns */
  // Recipe relations
  // TODO: Add Recipe relation
  @Field(() => [Recipe])
  @Column()
  favorites: Recipe[];

  @Field(() => [Recipe])
  @Column()
  postedRecipes: Recipe[];

  // RecipeComment relations
  // TODO: Add relation
  @Field(() => [RecipeComment])
  @Column()
  comments: RecipeComment[];

  // Menu relations
  // TODO: Add relation
  @Field(() => [Menu])
  @Column()
  menus: Menu[];
  /* End Relational Columns */
}
