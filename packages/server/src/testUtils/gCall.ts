import { graphql, GraphQLSchema } from "graphql";
// eslint-disable-next-line import/no-unresolved
import Maybe from "graphql/tsutils/Maybe";

import { buildSchema } from "../utils/buildSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  cookie?: jest.Mock<any, any>;
  clearCookie?: jest.Mock<any, any>;
}

let schema: GraphQLSchema;

export const gCall = async ({
  source,
  variableValues,
  cookie,
  clearCookie,
}: Options) => {
  if (!schema) {
    schema = await buildSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {},
      res: {
        cookie,
        clearCookie,
      },
    },
  });
};
