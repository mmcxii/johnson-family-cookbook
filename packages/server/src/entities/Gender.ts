import { Column, Entity } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { tableNames } from "../constants/tableNames";
import { DefaultColumns } from "./common/DefaultColumns";

export enum GenderIdEnum {
  Male = 1,
  Female = 2,
}
enum GenderNameEnum {
  Male = "M",
  Female = "F",
}
registerEnumType(GenderIdEnum, {
  name: "GenderEnum",
});

@ObjectType()
@Entity(tableNames.gender)
export class Gender extends DefaultColumns {
  @Field(() => String)
  @Column("enum", { name: "name", enum: GenderNameEnum })
  name: Gender;
}
