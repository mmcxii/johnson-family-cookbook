import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthV1UserContext } from "../../../../contexts";
import { UiRoutes } from "../../../../shared/constants/routes";

export type UnauthenticatedRoutesProps = {
  user: AuthV1UserContext.ContextData["data"]["user"];
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
