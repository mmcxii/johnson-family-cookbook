import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { UiRoutes } from "../../../shared/constants/routes";
import { NotFoundPage } from "../../pages/404";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";

export const Router: React.FC = () => {
  return (
    <Routes>
      {/* Authenticated Routes */}
      <Route element={<HomePage />} path={UiRoutes.Root} />

      {/* Public Routes */}
      <Route element={<LoginPage />} path={UiRoutes.Login} />
      <Route element={<RegisterPage />} path={UiRoutes.RegisterUser} />
      <Route element={<NotFoundPage />} path={UiRoutes.NotFound} />
    </Routes>
  );
};
