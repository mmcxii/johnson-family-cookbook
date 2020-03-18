import { registerEnumType } from "type-graphql";

export enum UserGenderEnum {
  M = "M",
  F = "F",
}
export type UserGender = "M" | "F";

export enum UserConfirmationStatusEnum {
  NotConfirmed = "NOT_CONFIRMED",
  Confirmed = "CONFIRMED",
}
export type UserConfirmationStatus = "NOT_CONFIRMED" | "CONFIRMED";

export enum UserPermissionLevelEnum {
  User = "USER",
  Admin = "ADMIN",
  Guest = "GUEST",
}
export type UserPermissionLevel = "USER" | "ADMIN" | "GUEST";

export interface UserRequiredValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthday: Date;
  gender: UserGender;
}

registerEnumType(UserGenderEnum, {
  name: "UserGender",
});

registerEnumType(UserConfirmationStatusEnum, {
  name: "UserConfirmationStatus",
  description: "Value tracking if a user has confirmed their account or not",
});

registerEnumType(UserPermissionLevelEnum, {
  name: "UserPermissionLevel",
  description: "Value tracking a user's permissions within the application",
});
