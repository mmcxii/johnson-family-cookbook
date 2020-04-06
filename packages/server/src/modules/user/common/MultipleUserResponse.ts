import { ObjectType, Field } from "type-graphql";

import { User } from "../../../entities/User";

@ObjectType()
export class MultipleUserResponse {
  @Field()
  status: "ERROR" | "SUCCESS";

  @Field()
  message: string;

  @Field(() => [User])
  users: User[];
}
