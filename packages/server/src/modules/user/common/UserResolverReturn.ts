import { ObjectType, Field } from "type-graphql";

import { ResolverReturnStatus } from "../../../types/common.types";
import { User } from "../../../entities/User";

@ObjectType()
export class UserResolverReturn {
  @Field(() => String)
  _status: ResolverReturnStatus;

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  payload: User | null;
}
