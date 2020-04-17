import React from "react";

import { PageLayout } from "../components/layout";
import { Router } from "../pages/Router";

export const App: React.FC = () => (
  <PageLayout>
    <Router />
  </PageLayout>
);
