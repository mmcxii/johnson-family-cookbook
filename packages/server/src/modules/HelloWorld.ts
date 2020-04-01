import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { MyContext } from "../types/MyContext";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  async helloWorld() {
    return "hello world";
  }

  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  async checkAuth(@Ctx() ctx: MyContext) {
    return `You're authenticated! User id is ${ctx.payload?.userId}`;
  }
}
