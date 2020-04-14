import React from "react";

import { Layout } from "../components/Layout";
import { Router } from "../pages/Router";

export const App: React.FC = () => (
  <Layout>
    <Router />
  </Layout>
);
