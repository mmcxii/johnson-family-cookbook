import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { TableNames } from "../../types/tableNames";
import { IUser, UserAccountStatusEnum } from "../../types/user.types";
import { DefaultColumns } from "../common/DefaultColumns";
import { Gender } from "../Gender";
import { PermissionLevel } from "../PermissionLevel";

/**
 * Name: user
 * Desc: The user is a user of the application.
 */
@ObjectType()
@Entity(TableNames.User)
export class User extends DefaultColumns implements IUser {
  /**
   * Name: accountStatus
   * Desc: The current status of a given account. Used to determine the validity of an account.
   * Access: API.
   * Values: "NOT_CONFIRMED", "ACTIVE", "DISABLED"
   */
  @Column("enum", {
    name: "account_status",
    enum: UserAccountStatusEnum,
    default: UserAccountStatusEnum.NotConfirmed,
  })
  accountStatus: UserAccountStatusEnum;

  /* Permission Level */
  /**
   * Name: permissionLevelId
   * Desc: The id associated with the user's permission level.
   * Access: Database only.
   */
  @Column({ name: "permission_level_id" })
  permissionLevelId: number;

  /**
   * Name: permissionLevel
   * Desc: The user's permission level, determined by a join on the permissionLevelId.
   * Access: API.
   */
  @Field(() => PermissionLevel)
  @ManyToOne(() => PermissionLevel, (pl) => pl.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permission_level_id" })
  permissionLevel: PermissionLevel;
  /* Permission Level */

  /**
   * Name: firstName
   * Desc: The user's first name.
   * Access: API.
   */
  @Field()
  @Column({ name: "first_name" })
  firstName: string;

  /**
   * Name: lastName
   * Desc: The user's last name.
   * Access: API.
   */
  @Field()
  @Column({ name: "last_name" })
  lastName: string;

  /**
   * Name: email
   * Desc: The user's email. This value is unique because it is meant to be tied to a single user.
   * Access: API.
   */
  @Field()
  @Column({ name: "email", unique: true })
  email: string;

  /**
   * Name: passwoed
   * Desc: The user's password. The value is securely stored using a hash.
   * Access: Database only.
   */
  @Column({ name: "password" })
  password: string;

  /**
   * Name: tokenVersion
   * Desc: The current version of the user's tokens. This value should be incremented when a user requires their tokens to be revoked,
   * such as when they forget their password or their account is compromised.
   * Access: Database only.
   */
  @Column("int", { name: "token_version", default: 0 })
  tokenVersion: number;

  /**
   * Name: birthday
   * Desc: The user's birthday.
   * Access: API.
   */
  @Field()
  @Column({ name: "birthday" })
  birthday: Date;

  /**
   * Name: profilePictureUrl
   * Desc: The url of the user's profile picture. The image is stored in an external Amazon S3 database.
   * Access: API.
   */
  @Field(() => String, { nullable: true })
  @Column("text", { name: "profile_picture_url", nullable: true })
  profilePictureUrl: string | null;

  /* Gender */
  /**
   * Name: genderId
   * Desc: The id associated with the user's gender.
   * Access: Database only.
   */
  @Column({ name: "gender_id" })
  genderId: number;

  /**
   * Name: gender
   * Desc: The user's gender, determined by a join on the genderId.
   * Access: API.
   */
  @Field(() => Gender)
  @ManyToOne(() => Gender, (g) => g.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
  /* Gender */
}
