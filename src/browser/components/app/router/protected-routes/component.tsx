import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthV1UserContext } from "../../../../contexts";
import { UiRoutes } from "../../../../shared/constants/routes";

export type ProtectedRoutesProps = {
  user: AuthV1UserContext.ContextData["data"]["user"];
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
