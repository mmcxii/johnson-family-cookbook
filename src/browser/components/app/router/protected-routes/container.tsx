import * as React from "react";
import { AuthV1UserContext } from "../../../../contexts";
import { ProtectedRoutes, ProtectedRoutesProps } from "./component";

export type ProtectedRoutesContainerProps = Omit<ProtectedRoutesProps, "user">;

export const ProtectedRoutesContainer: React.FC<ProtectedRoutesContainerProps> = (props) => {
  //* Contexts
  const authV1UserContext = React.useContext(AuthV1UserContext.Context);

  //* Variables
  const { user } = authV1UserContext.data;

  return <ProtectedRoutes {...props} user={user} />;
};
