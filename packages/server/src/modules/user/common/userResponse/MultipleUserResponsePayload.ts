import { ObjectType, Field } from "type-graphql";

import { User } from "../../../../entities/User";

@ObjectType()
export class MultipleUserResponsePayload {
  @Field(() => [User])
  users: User[];
}
