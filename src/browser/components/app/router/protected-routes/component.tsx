import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UiRoutes } from "../../../../shared/constants/routes";
import { User } from "../../../../shared/types/api";

export type ProtectedRoutesProps = {
  user: undefined | User;
};

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = (props) => {
  const { user } = props;

  //* Router
  const navigate = useNavigate();
  const location = useLocation();

  if (user == null) {
    navigate(UiRoutes.Login, { state: { from: location } });
  }

  return <Outlet />;
};
