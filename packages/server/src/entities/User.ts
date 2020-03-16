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
    default: UserConfirmationStatus.NOT_CONFIRMED,
  })
  _confirmationStatus: UserConfirmationStatus;

  @Field()
  @Column({
    type: "enum",
    enum: UserPermissionLevel,
    default: UserPermissionLevel.USER,
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
  @Field()
  @Column()
  favorites: any[]; // TODO: Replace with Recipe and Recipe relation

  @Field()
  @Column()
  postedRecipes: any[]; // TODO: Replace with Recipe and Recipe relation

  // RecipeComment relations
  @Field()
  @Column()
  comments: any[]; // TODO: Replace with RecipeComment and RecipeComment relation

  // Menu relations
  @Field()
  @Column()
  menus: any[]; // TODO: Replace with Menu and Menu relation
  /* End Relational Columns */
}
