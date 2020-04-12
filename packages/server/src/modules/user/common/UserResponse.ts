import { ObjectType, Field } from "type-graphql";

import { UserResponsePayload } from "./userResponse/UserResponsePayload";
import { DefaultResponseObject } from "../../common/DefaultResponseObject.abstract";

@ObjectType()
export class UserResponse extends DefaultResponseObject {
  @Field(() => UserResponsePayload)
  payload: UserResponsePayload;
}
