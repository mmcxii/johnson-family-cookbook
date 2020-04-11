import { InputType, Field } from "type-graphql";

import { GenderCodeEnum } from "../../../types/gender.types";
import { PermissionLevelCodeEnum } from "../../../types/permissionLevel.types";

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => GenderCodeEnum, { name: "genderCode" })
  genderCode: GenderCodeEnum;

  @Field(() => PermissionLevelCodeEnum, {
    defaultValue: PermissionLevelCodeEnum.User,
    name: "permissionLevelCode",
  })
  permissionLevelCode: PermissionLevelCodeEnum;
}
