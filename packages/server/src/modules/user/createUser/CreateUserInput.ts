import { InputType, Field } from "type-graphql";
import {
  UserRequiredValues,
  UserPermissionLevel,
  UserGender,
} from "../../../types/user.types";

@InputType()
export class CreateUserInput implements UserRequiredValues {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  birthday: Date;

  @Field(() => String)
  _permissionLevel: UserPermissionLevel;

  @Field(() => String)
  gender: UserGender;
}
