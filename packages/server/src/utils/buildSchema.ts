import { buildSchema as tgqlBuildSchema } from "type-graphql";

export const buildSchema = async () =>
  await tgqlBuildSchema({
    resolvers: [__dirname + "/../modules/{,!(__test__)}/*.{t,j}s"],
    validate: false,
  });
