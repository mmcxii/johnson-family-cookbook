import { ObjectType, Field } from "type-graphql";

import { UserResponsePayload } from "./userResponse/UserResponsePayload";

@ObjectType()
export class UserResponse {
  @Field()
  status: "ERROR" | "SUCCESS";

  @Field()
  message: string;

  @Field(() => UserResponsePayload)
  payload: UserResponsePayload;
}
