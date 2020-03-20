import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import {
  UserRequiredValues,
  UserGender,
  UserAccountStatus,
  UserPermissionLevel,
} from "../types/user.types";

@ObjectType()
@Entity("users")
export class User extends BaseEntity implements UserRequiredValues {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => Date)
  @Column()
  birthday: Date;

  @Field(() => String)
  @Column("text")
  gender: UserGender;

  @Field(() => Date)
  @CreateDateColumn()
  accountCreatedDate: Date;

  @Field(() => String)
  @Column("text", { default: "NOT_CONFIRMED" })
  _status: UserAccountStatus;

  @Field(() => String)
  @Column("text", { default: "USER" })
  _permissionLevel: UserPermissionLevel;
}
