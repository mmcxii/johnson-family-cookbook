import { registerEnumType } from "type-graphql";

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
