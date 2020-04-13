import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";

import { REACT_APP_API_URL } from "../constants/envVariables";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: REACT_APP_API_URL!,
      credentials: "include",
    }),
  ]),
  cache,
});

export const ApolloWrapper: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
