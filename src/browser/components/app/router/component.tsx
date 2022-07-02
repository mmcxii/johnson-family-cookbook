import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { UiRoutes } from "../../../shared/constants/routes";
import { NotFoundPage } from "../../pages/404";
import { HomePage } from "../../pages/home";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={UiRoutes.Root} />

      <Route element={<NotFoundPage />} path={UiRoutes.NotFound} />
    </Routes>
  );
};
