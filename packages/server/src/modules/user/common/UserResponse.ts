import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entities/User";

@ObjectType()
export class UserResponse {
  @Field()
  status: "ERROR" | "SUCCESS";

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  payload: User | null;
}
