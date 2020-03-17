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
} from "../types/User";

import { Recipe } from "./Recipe";
import { Menu } from "./Menu";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  /* Begin Generated Columns */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  joinedAt: Date;

  @Field()
  @Column({
    type: "enum",
    enum: UserConfirmationStatus,
    default: UserConfirmationStatus.NotConfirmed,
  })
  _confirmationStatus: UserConfirmationStatus;

  @Field()
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

  @Column()
  password: string;

  @Field()
  @Column()
  birthday: Date;

  @Field()
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
  @Field()
  @Column()
  favorites: Recipe[];

  @Field()
  @Column()
  postedRecipes: Recipe[];

  // RecipeComment relations
  // TODO: Replace with RecipeComment and add relation
  @Field()
  @Column()
  comments: any[];

  // Menu relations
  // TODO: Replace with Menu and add relation
  @Field()
  @Column()
  menus: Menu[];
  /* End Relational Columns */
}
