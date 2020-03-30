import { InputType, Field } from "type-graphql";

import { GenderIdEnum } from "../../../entities/Gender";
import { PermissionLevelIdEnum } from "../../../entities/PermissionLevel";

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
