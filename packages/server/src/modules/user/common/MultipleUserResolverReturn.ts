import { ObjectType, Field } from "type-graphql";

import { ResolverReturnStatus } from "../../../types/Common";
import { User } from "../../../entities/User";

@ObjectType()
export class MultipleUserResolverReturn {
  @Field(() => String)
  _status: ResolverReturnStatus;

  @Field()
  message: string;

  @Field(() => [User], { nullable: true })
  payload: User[] | null;
}
