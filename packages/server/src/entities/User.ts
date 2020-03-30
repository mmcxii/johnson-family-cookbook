import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { tableNames } from "../constants/tableNames";
import { UserAccountStatusEnum } from "../types/user.types";
import { DefaultColumns } from "./common/DefaultColumns";
import { Gender } from "./Gender";
import { PermissionLevel } from "./PermissionLevel";

@ObjectType()
@Entity(tableNames.user)
export class User extends DefaultColumns {
  @Field(() => String)
  @Column("enum", {
    name: "account_status",
    enum: UserAccountStatusEnum,
    default: UserAccountStatusEnum.NotConfirmed,
  })
  confirmationStatus: UserAccountStatusEnum;

  @Field(() => PermissionLevel)
  @ManyToOne(
    () => PermissionLevel,
    (pl) => pl._id_,
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
  profilePictureUrl: string;

  @Field(() => Gender)
  @ManyToOne(
    () => Gender,
    (g) => g._id_,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
}
