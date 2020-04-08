import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { TableNames } from "../types/tableNames";
import { IUser, UserAccountStatusEnum } from "../types/user.types";
import { DefaultColumns } from "./common/DefaultColumns";
import { Gender } from "./Gender";
import { PermissionLevel } from "./PermissionLevel";

@ObjectType()
@Entity(TableNames.User)
export class User extends DefaultColumns implements IUser {
  @Column("enum", {
    name: "account_status",
    enum: UserAccountStatusEnum,
    default: UserAccountStatusEnum.NotConfirmed,
  })
  accountStatus: UserAccountStatusEnum;

  @Column({ name: "permission_level_id" })
  permissionLevelId: number;

  @Field(() => PermissionLevel)
  @ManyToOne(() => PermissionLevel, (pl) => pl.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permission_level_id" })
  permissionLevel: PermissionLevel;

  @Field()
  @Column({ name: "first_name" })
  firstName: string;

  @Field()
  @Column({ name: "last_name" })
  lastName: string;

  @Field()
  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column("int", { name: "token_version", default: 0 })
  tokenVersion: number;

  @Field()
  @Column({ name: "birthday" })
  birthday: Date;

  @Field(() => String, { nullable: true })
  @Column("text", { name: "profile_picture_url", nullable: true })
  profilePictureUrl: string | null;

  @Column({ name: "gender_id" })
  genderId: number;

  @Field(() => Gender)
  @ManyToOne(() => Gender, (g) => g.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
}
