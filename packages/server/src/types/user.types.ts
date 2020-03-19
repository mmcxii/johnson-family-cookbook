export interface UserRequiredValues {
  _permissionLevel: UserPermissionLevel;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthday: Date;
  gender: UserGender;
}

export type UserGender = "M" | "F";
export type UserConfirmationStatus = "NOT_CONFIRMED" | "CONFIRMED";
export type UserPermissionLevel = "USER" | "ADMIN" | "GUEST";
