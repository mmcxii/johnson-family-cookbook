import { Column, Entity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { TableNames } from "../types/tableNames";
import { IGender, GenderNameEnum, GenderCodeEnum } from "../types/gender.types";
import { DefaultColumns } from "./common/DefaultColumns";

@ObjectType()
@Entity(TableNames.Gender)
export class Gender extends DefaultColumns implements IGender {
  @Field(() => String)
  @Column("enum", { name: "name", enum: GenderNameEnum, unique: true })
  name: GenderNameEnum;

  @Field(() => Int)
  @Column("enum", { name: "code", enum: GenderCodeEnum, unique: true })
  code: GenderCodeEnum;
}
