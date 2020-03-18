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
  /*
    Begin generated values
  */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  /* Begin relational values */
  @Field(() => [Menu])
  @ManyToMany(
    () => Menu,
    (m) => m.courses,
  ) // Relationship owned by Menu
  usedInMenus: Menu[];
  /* End relational values */

  /*
    End generated values
  */

  /*
    Begin required values
  */

  /* Begin relational values */
  @Field(() => [Recipe])
  @ManyToMany(() => Recipe)
  @JoinTable()
  dishes: Recipe[];
  /* End relational values */

  /*
    End required values
  */

  /*
    Begin optional values
  */
  @Field()
  @Column({ nullable: true })
  name?: string;
  /*
    End optional values
  */
}
