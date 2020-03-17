import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";

import { Recipe } from "./Recipe";
import { Menu } from "./Menu";

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
  @Field(() => [Menu])
  @ManyToMany(
    () => Menu,
    (m) => m.courses,
  )
  usedInMenus: Menu[];
  /* End Relational Columns */
}
