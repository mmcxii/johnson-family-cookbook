import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
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

  /* Begin Optional Columns */
  @Field()
  @Column({ nullable: true })
  name?: string;
  /* End Optional Columns */

  /* Begin Relational Columns */
  // Menu Relation
  @Field(() => [Menu])
  @ManyToMany(
    () => Menu,
    (m) => m.courses,
  ) // Relationship owned by Menu
  usedInMenus: Menu[];

  @Field(() => [Recipe])
  @ManyToMany(() => Recipe)
  @JoinTable()
  dishes: Recipe[];
  /* End Relational Columns */
}
