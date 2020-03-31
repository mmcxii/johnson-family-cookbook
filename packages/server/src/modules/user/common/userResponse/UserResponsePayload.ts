import { ObjectType, Field } from "type-graphql";
import { User } from "../../../../entities/User";

@ObjectType()
export class UserResponsePayload {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => ({ accessToken: String }), { nullable: true })
  tokens?: {
    accessToken: string;
  };
}
