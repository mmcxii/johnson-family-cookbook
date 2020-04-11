import { registerEnumType } from "type-graphql";

/**
 * Interface for ensuring that PermissionLevel contains all expected columns.
 * If new fields should be added to PermissionLevel they should first be added here.
 */
export interface IPermissionLevel {
  name: PermissionLevelNameEnum;
  code: PermissionLevelCodeEnum;
}

export enum PermissionLevelCodeEnum {
  Admin = 0,
  User = 100,
  Guest = 200,
}

export enum PermissionLevelNameEnum {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

registerEnumType(PermissionLevelCodeEnum, {
  name: "PermissionLevelCodeEnum",
});
