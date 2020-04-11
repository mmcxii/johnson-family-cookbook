import { ObjectType, Field } from "type-graphql";

import { DefaultResponseObject } from "../../common/DefaultResponseObject.abstract";
import { MultipleUserResponsePayload } from "./userResponse/MultipleUserResponsePayload";

@ObjectType()
export class MultipleUserResponse extends DefaultResponseObject {
  @Field(() => MultipleUserResponsePayload)
  payload: MultipleUserResponsePayload;
}
