import * as React from "react";
import { AuthV1UserContext } from "../../../contexts";
import { HomePage, HomePageProps } from "./component";

export type HomePageContainerProps = Omit<HomePageProps, "user">;

export const HomePageContainer: React.FC<HomePageContainerProps> = (props) => {
  //* Contexts
  const authV1UserContext = React.useContext(AuthV1UserContext.Context);

  //* Variables
  const { user } = authV1UserContext.data;

  return <HomePage {...props} user={user} />;
};
