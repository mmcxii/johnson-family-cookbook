import * as React from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { UiRoutes } from "../../../shared/constants/routes";
import { NotFoundPage } from "../../pages/404";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ProtectedRoutes } from "./protected-routes";
import { UnauthenticatedRoutes } from "./unauthenticated-routes";

export const Router: React.FC = () => {
  return (
    <Routes>
      {/* Authenticated Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<HomePage />} path={UiRoutes.Root} />
      </Route>

      {/* Unauthenticated Routes */}
      <Route element={<UnauthenticatedRoutes />}>
        <Route element={<LoginPage />} path={UiRoutes.Login} />
        <Route element={<RegisterPage />} path={UiRoutes.RegisterUser} />
      </Route>

      {/* Public Routes */}
      <Route element={<NotFoundPage />} path={UiRoutes.NotFound} />
    </Routes>
  );
};
