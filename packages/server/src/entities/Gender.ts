import { Column, Entity } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { TableNames } from "../types/tableNames";
import { GenderNameEnum } from "../types/gender.types";
import { DefaultColumns } from "./common/DefaultColumns";

@ObjectType()
@Entity(TableNames.Gender)
export class Gender extends DefaultColumns {
  @Field(() => String)
  @Column("enum", { name: "name", enum: GenderNameEnum })
  name: Gender;
}
