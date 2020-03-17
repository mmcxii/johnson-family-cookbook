import { ObjectType, Field, ID, Ctx } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { Recipe } from "./Recipe";
import { Menu } from "./Menu";
import { MenuToMenuCourse } from "./relations/MenuToMenuCourse";
import { JfcbContext } from "../utils/JfcbContext";

@ObjectType()
@Entity("menu_courses")
export class MenuCourse extends BaseEntity {
  /* Begin Generated Columns */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  /* End Generated Columns */

  /* Begin Columns needed to create entity */
  @Field(() => [Recipe])
  @Column()
  dishes: Recipe[];
  /* End Columns needed to create entity */

  /* Begin Optional Columns */
  @Field()
  @Column({ nullable: true })
  name?: string;
  /* End Optional Columns */

  /* Begin Relational Columns */
  @OneToMany(
    () => MenuToMenuCourse,
    (mmc) => mmc.menu,
  )
  menuConnection: Promise<MenuToMenuCourse[]>;

  @Field(() => [Menu])
  async usedInMenus(@Ctx() { menusLoader }: JfcbContext): Promise<Menu[]> {
    return menusLoader.load(this.id);
  }
  /* End Relational Columns */
}
