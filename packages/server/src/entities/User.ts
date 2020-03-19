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
} from "../types/user.types.";
import { Recipe } from "./Recipe";
import { Menu } from "./Menu";
import { RecipeComment } from "./RecipeComment";

@ObjectType()
@Entity("users")
export class User extends BaseEntity implements UserRequiredValues {
  /*
    Begin generated values 
  */
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

  /* Begin relational values */
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

  @Field(() => [RecipeComment], { defaultValue: [] })
  @OneToMany(
    () => RecipeComment,
    (rc) => rc.author,
  )
  comments: RecipeComment[];

  @Field(() => [Menu], { defaultValue: [] })
  @OneToMany(
    () => Menu,
    (m) => m.createdBy,
  )
  menus: Menu[];
  /* End relational values */

  /*
    End generated values 
  */

  /*
    Begin required values
  */
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
  /*
    End required values
  */

  /*
    Begin optional values
  */
  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Save user images in S3
  /*
    End optional values
  */
}
