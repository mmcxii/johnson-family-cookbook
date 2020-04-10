import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column } from "typeorm";

import { TableNames } from "../../types/tableNames";
import {
  IPermissionLevel,
  PermissionLevelNameEnum,
  PermissionLevelCodeEnum,
} from "../../types/permissionLevel.types";
import { DefaultColumns } from "../common/DefaultColumns";

/**
 * Name: permission_level
 * Desc: The permission level is the level and type of access a user has within the application.
 */
@ObjectType()
@Entity(TableNames.PermissionLevel)
export class PermissionLevel extends DefaultColumns
  implements IPermissionLevel {
  /**
   * Name: name
   * Desc: The name associated with the user's permission level.
   * Access: API.
   * Values: "ADMIN", "USER", "GUEST"
   */
  @Field(() => String)
  @Column("enum", { name: "name", enum: PermissionLevelNameEnum, unique: true })
  name: PermissionLevelNameEnum;

  /**
   * Name: code
   * Desc: The numeric value associated with a permission level. Certain actions will check against this value to determine if the user should be allowed to perform that action.
   * Access: API.
   * Values: "0", "100", "200"
   */
  @Field(() => Int)
  @Column("enum", { name: "code", enum: PermissionLevelCodeEnum, unique: true })
  code: PermissionLevelCodeEnum;
}
