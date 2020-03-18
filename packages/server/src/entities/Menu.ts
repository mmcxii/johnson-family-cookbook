import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

import { MenuRequiredValues } from "../types/menu.types";
import { User } from "./User";
import { MenuCourse } from "./MenuCourse";

@ObjectType()
@Entity("menus")
export class Menu extends BaseEntity implements MenuRequiredValues {
  /*
    Begin generated values
  */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  /*
    End generated values
  */

  /*
    Begin required values
  */
  @Field()
  @Column()
  name: string;

  /* Begin required relational values */
  @Field(() => User)
  @ManyToOne(
    () => User,
    (u) => u.menus,
  )
  createdBy: User;

  @Field(() => [MenuCourse])
  @ManyToMany(
    () => MenuCourse,
    (mc) => mc.usedInMenus,
  )
  @JoinTable()
  courses: MenuCourse[];
  /* End required relational values */

  /*
    End required values
  */

  /*
    Begin optional values
  */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Save image in s3
  /*
    End optional values
  */
}
