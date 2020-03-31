import {
  Entity, Column, ManyToOne, JoinColumn,
} from "typeorm";
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
  confirmationStatus: UserAccountStatusEnum;

  @Field(() => PermissionLevel)
  @ManyToOne(
    () => PermissionLevel,
    (pl) => pl._id_, // eslint-disable-line no-underscore-dangle
  )
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

  @Field()
  @Column({ name: "birthday" })
  birthday: Date;

  @Field()
  @Column({ name: "profile_picture_url", nullable: true })
  profilePictureUrl: string | null;

  @Field(() => Gender)
  @ManyToOne(
    () => Gender,
    (g) => g._id_, // eslint-disable-line no-underscore-dangle
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
}
