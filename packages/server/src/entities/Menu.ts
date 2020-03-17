import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
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

  @Field()
  @Column()
  createdBy: User;

  @Field()
  @Column()
  courses: MenuCourse[]; // TODO: Add relation
  /* End Columns needed to create entity */

  /* Begin Optional columns */
  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  image?: string; // TODO: Save image in s3
  /* End Optional Columns */
}
