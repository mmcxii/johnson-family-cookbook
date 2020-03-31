import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  static async helloWorld() {
    return "hello world";
  }
}
