import { User } from "../entities/User";
import { MenuCourse } from "../entities/MenuCourse";

export interface MenuRequiredValues {
  name: string;
  createdBy: User;
  courses: MenuCourse[];
}
