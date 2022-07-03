import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { UnauthenticatedRoutes, UnauthenticatedRoutesProps } from "./component";

export type UnauthenticatedRoutesContainerProps = Omit<UnauthenticatedRoutesProps, "user">;

export const UnauthenticatedRoutesContainer: React.FC<UnauthenticatedRoutesContainerProps> = (
  props,
) => {
  //* Queries
  const user = AuthV1Queries.useGetUser();

  return <UnauthenticatedRoutes {...props} user={user.data} />;
};
