import { InputType, Field } from "type-graphql";

import { GenderIdEnum } from "../../../types/gender.types";
import { PermissionLevelIdEnum } from "../../../types/permissionLevel.types";

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

  @Field(() => GenderIdEnum, { name: "genderId" })
  genderId: GenderIdEnum;

  @Field(() => PermissionLevelIdEnum, {
    defaultValue: PermissionLevelIdEnum.User,
    name: "permissionLevelId",
  })
  permissionLevelId: PermissionLevelIdEnum;
}
