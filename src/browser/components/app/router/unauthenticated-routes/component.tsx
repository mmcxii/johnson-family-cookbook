import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UiRoutes } from "../../../../shared/constants/routes";
import { User } from "../../../../shared/types/api";

export type UnauthenticatedRoutesProps = {
  user: undefined | User;
};

export const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = (props) => {
  const { user } = props;

  //* Router
  const navigate = useNavigate();
  const location = useLocation();

  if (user != null) {
    navigate(UiRoutes.Root, { state: { from: location } });
  }

  return <Outlet />;
};
