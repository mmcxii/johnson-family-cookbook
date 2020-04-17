import React from "react";
import { BrowserRouter } from "react-router-dom";
import Normalize from "react-normalize";

import { ApolloWrapper } from "../lib/Apollo";
import { App } from "./App";
import { GlobalStyles } from "./CSSReset";

export const Root: React.FC = () => (
  <>
    {/*
     * CSS Resets
     */}
    <Normalize />
    <GlobalStyles />

    {/*
     * Wrapping the Application in necessary services
     */}
    <ApolloWrapper>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloWrapper>
  </>
);
