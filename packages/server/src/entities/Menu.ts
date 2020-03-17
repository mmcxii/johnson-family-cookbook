import { ObjectType, Field, ID, Ctx } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from "typeorm";

import { User } from "./User";
import { MenuMenuCourse } from "./relations/Menu-MenuCourse";
import { JfcbContext } from "../utils/JfcbContext";
import { MenuCourse } from "./MenuCourse";

@ObjectType()
@Entity("menus")
export class Menu extends BaseEntity {
  /* Begin Generated Columns */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  /* End Generated Columns */

  /* Begin Columns needed to create entity */
  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @Column()
  createdBy: User;
  /* End Columns needed to create entity */

  /* Begin Optional columns */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  image?: string; // TODO: Save image in s3
  /* End Optional Columns */

  /* Begin Relational Columns */
  // MenuCourse Connection
  @OneToMany(
    () => MenuMenuCourse,
    (mmc) => mmc.menuCourse,
  )
  menuCourseConnection: Promise<MenuMenuCourse[]>;

  @Field()
  async courses(
    @Ctx() { menuCoursesLoader }: JfcbContext,
  ): Promise<MenuCourse[]> {
    return menuCoursesLoader.load(this.id);
  }
  /* End Relational Columns */
}
