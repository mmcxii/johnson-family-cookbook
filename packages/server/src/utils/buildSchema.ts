import { buildSchema as tgqlBuildSchema } from "type-graphql";

export async function buildSchema() {
  return tgqlBuildSchema({
    resolvers: [`${__dirname}/../modules/{,!(__test__)}/*.{t,j}s`],
    validate: false,
  });
}
