import { ObjectType, Field, registerEnumType } from "type-graphql";
import { Entity, Column } from "typeorm";

import { tableNames } from "../constants/tableNames";
import { DefaultColumns } from "./common/DefaultColumns";

export enum PermissionLevelIdEnum {
  Admin = 1,
  User = 2,
  Guest = 3,
}
enum PermissionLevelNameEnum {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}
registerEnumType(PermissionLevelIdEnum, {
  name: "PermissionLevelEnum",
});

@ObjectType()
@Entity(tableNames.permissionLevel)
export class PermissionLevel extends DefaultColumns {
  @Field(() => String)
  @Column("enum", { name: "name", enum: PermissionLevelNameEnum })
  name: PermissionLevelNameEnum;
}
