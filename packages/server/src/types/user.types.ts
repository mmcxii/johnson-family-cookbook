import { PermissionLevel } from "../entities/PermissionLevel";
import { Gender } from "../entities/Gender";

/**
 * Interface for ensuring that User contains all expected columns.
 * If new fields should be added to User they should first be added here.
 */
export interface IUser {
  accountStatus: UserAccountStatusEnum;
  permissionLevel: PermissionLevel;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  profilePictureUrl: string | null;
  gender: Gender;
}

export enum UserAccountStatusEnum {
  NotConfirmed = "NOT_CONFIRMED",
  Active = "ACTIVE",
  Disabled = "DISABLED",
}
