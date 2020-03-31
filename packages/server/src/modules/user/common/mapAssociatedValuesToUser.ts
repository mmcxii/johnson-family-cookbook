import { User } from "../../../entities/User";
import { Gender } from "../../../entities/Gender";
import { PermissionLevel } from "../../../entities/PermissionLevel";

export async function mapAssociatedValuesToUser(user: User): Promise<User> {
  const temp = user;

  const [gender, permissionLevel] = await Promise.all([
    Gender.findOne({ where: { _id_: user.genderId } }),
    PermissionLevel.findOne({ where: { _id_: user.permissionLevelId } }),
  ]);

  if (gender) {
    temp.gender = gender;
  }
  if (permissionLevel) {
    temp.permissionLevel = permissionLevel;
  }

  return temp;
}
