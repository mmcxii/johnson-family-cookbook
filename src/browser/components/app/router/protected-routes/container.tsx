import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { ProtectedRoutes, ProtectedRoutesProps } from "./component";

export type ProtectedRoutesContainerProps = Omit<ProtectedRoutesProps, "user">;

export const ProtectedRoutesContainer: React.FC<ProtectedRoutesContainerProps> = (props) => {
  //* Queries
  const user = AuthV1Queries.useGetUser();

  return <ProtectedRoutes {...props} user={user.data} />;
};
