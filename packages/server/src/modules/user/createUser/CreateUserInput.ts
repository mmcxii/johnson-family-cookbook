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

  @Field(() => GenderIdEnum, { name: "gender" })
  gender: GenderIdEnum;

  @Field(() => PermissionLevelIdEnum, {
    defaultValue: PermissionLevelIdEnum.User,
    name: "permissionLevel",
  })
  permissionLevel: PermissionLevelIdEnum;
}
