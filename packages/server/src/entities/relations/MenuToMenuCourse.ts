import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Menu } from "../Menu";
import { MenuCourse } from "../MenuCourse";

@Entity("menu__menu_course")
export class MenuToMenuCourse extends BaseEntity {
  /* Begin Reference Columns */
  @PrimaryColumn()
  menuId: number;

  @PrimaryColumn()
  menuCourseId: number;
  /* End Reference Columns */

  /* Begin Join Columns */
  @ManyToOne(
    () => Menu,
    (m) => m.menuCourseConnection,
    { primary: true },
  )
  @JoinColumn({ name: "menuId" })
  menu: Promise<Menu>;

  @ManyToOne(
    () => MenuCourse,
    (mc) => mc.menuConnection,
    { primary: true },
  )
  @JoinColumn({ name: "menuCourseId" })
  menuCourse: Promise<MenuCourse>;
  /* End Join Columns */
}
