import * as React from "react";
import { AuthV1UserContext } from "../../../../contexts";
import { UnauthenticatedRoutes, UnauthenticatedRoutesProps } from "./component";

export type UnauthenticatedRoutesContainerProps = Omit<UnauthenticatedRoutesProps, "user">;

export const UnauthenticatedRoutesContainer: React.FC<UnauthenticatedRoutesContainerProps> = (
  props,
) => {
  //* Contexts
  const authV1UserContext = React.useContext(AuthV1UserContext.Context);

  //* Variables
  const { user } = authV1UserContext.data;

  return <UnauthenticatedRoutes {...props} user={user} />;
};
