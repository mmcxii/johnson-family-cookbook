import { registerEnumType } from "type-graphql";

export enum UserGender {
  M = "M",
  F = "F",
}

export enum UserConfirmationStatus {
  NotConfirmed = "NOT_CONFIRMED",
  Confirmed = "CONFIRMED",
}

export enum UserPermissionLevel {
  User = "USER",
  Admin = "ADMIN",
  Guest = "GUEST",
}

registerEnumType(UserGender, {
  name: "UserGender",
});

registerEnumType(UserConfirmationStatus, {
  name: "UserConfirmationStatus",
  description: "Value tracking if a user has confirmed their account or not",
});

registerEnumType(UserPermissionLevel, {
  name: "UserPermissionLevel",
  description: "Value tracking a user's permissions within the application",
});
