import { InputType, Field } from "type-graphql";

import { UserRequiredValues, UserGender } from "../../../types/User";

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

  @Field(() => UserGender)
  gender: UserGender;
}
