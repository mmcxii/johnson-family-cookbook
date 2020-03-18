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

import { User } from "./User";
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
  @ManyToOne(
    () => User,
    (u) => u.menus,
  )
  createdBy: User;
  /* End Columns needed to create entity */

  /* Begin Optional columns */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: true })
  image?: string; // TODO: Save image in s3
  /* End Optional Columns */

  /* Begin Relational Columns */
  // MenuCourse Connection
  @Field(() => [MenuCourse])
  @ManyToMany(
    () => MenuCourse,
    (mc) => mc.usedInMenus,
  )
  @JoinTable()
  courses: MenuCourse[];
  /* End Relational Columns */
}
