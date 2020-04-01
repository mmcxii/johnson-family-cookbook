import { ObjectType, Field } from "type-graphql";

import { User } from "../../../../entities/User";
import { Tokens } from "./userResponsePayload/Tokens";

@ObjectType()
export class UserResponsePayload {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => Tokens, { nullable: true })
  tokens?: Tokens | null;
}
