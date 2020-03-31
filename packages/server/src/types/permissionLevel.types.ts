import { registerEnumType } from "type-graphql";

/**
 * Interface for ensuring that PermissionLevel contains all expected columns.
 * If new fields should be added to PermissionLevel they should first be added here.
 */
export interface IPermissionLevel {
  name: PermissionLevelNameEnum;
}

export enum PermissionLevelIdEnum {
  Admin = 1,
  User = 2,
  Guest = 3,
}

export enum PermissionLevelNameEnum {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

registerEnumType(PermissionLevelIdEnum, {
  name: "PermissionLevelIdEnum",
});
