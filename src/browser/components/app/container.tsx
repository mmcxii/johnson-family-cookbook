import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { AuthV1Queries } from "../../queries";
import { App } from "./component";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const AppContainer: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppDataLoader />

        <App />
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const AppDataLoader: React.FC = () => {
  //* Queries
  AuthV1Queries.useGetUser();

  return null;
};
