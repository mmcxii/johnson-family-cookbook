import { Column, Entity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { TableNames } from "../../types/tableNames";
import {
  IGender,
  GenderNameEnum,
  GenderCodeEnum,
} from "../../types/gender.types";
import { DefaultColumns } from "../common/DefaultColumns";

/**
 * Name: gender
 * Desc: The gender is a uitility table for storing the user's gender, the "user" record stores a reference to an entity in this table.
 */
@ObjectType()
@Entity(TableNames.Gender)
export class Gender extends DefaultColumns implements IGender {
  /**
   * Name: name
   * Desc: The name of the user's gender.
   * Access: API.
   * Values: "M", "F", "O"
   */
  @Field(() => String)
  @Column("enum", { name: "name", enum: GenderNameEnum, unique: true })
  name: GenderNameEnum;

  /**
   * Name: code
   * Desc: A numeric code for the user's gender.
   * Access: API.
   * Values: "1", "2", "3"
   */
  @Field(() => Int)
  @Column("enum", { name: "code", enum: GenderCodeEnum, unique: true })
  code: GenderCodeEnum;
}
