import { InputType, Field } from "type-graphql";

import { UserRequiredValues, UserGender } from "../../../types/user.types.";

@InputType()
export class CreateUserInput implements UserRequiredValues {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  birthday: Date;

  @Field(() => String)
  gender: UserGender;
}
