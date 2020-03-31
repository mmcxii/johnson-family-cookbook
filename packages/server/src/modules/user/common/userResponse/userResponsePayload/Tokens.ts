import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;
}
