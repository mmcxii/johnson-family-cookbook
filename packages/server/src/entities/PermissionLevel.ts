import { ObjectType, Field } from "type-graphql";
import { Entity, Column } from "typeorm";

import { tableNames } from "../constants/tableNames";
import { PermissionLevelNameEnum } from "../types/permissionLevel.types";
import { DefaultColumns } from "./common/DefaultColumns";

@ObjectType()
@Entity(tableNames.permissionLevel)
export class PermissionLevel extends DefaultColumns {
  @Field(() => String)
  @Column("enum", { name: "name", enum: PermissionLevelNameEnum })
  name: PermissionLevelNameEnum;
}
