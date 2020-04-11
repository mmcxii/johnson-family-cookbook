import { ObjectType, Field } from "type-graphql";

import { ResponseStatus } from "../../types/common.types";

@ObjectType()
export abstract class DefaultResponseObject {
  @Field(() => String)
  status: ResponseStatus;

  @Field()
  message: string;

  abstract payload: any;
}
