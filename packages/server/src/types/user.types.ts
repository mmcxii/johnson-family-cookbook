export interface UserRequiredValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthday: Date;
  gender: UserGender;
}

export type UserGender = "M" | "F";
export type UserAccountStatus = "NOT_CONFIRMED" | "DISABLED" | "ACTIVE";
export type UserPermissionLevel = "USER" | "ADMIN" | "GUEST";
