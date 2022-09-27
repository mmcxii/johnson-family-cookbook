import * as React from "react";
import { AuthV1LoginFormContext } from "../../../contexts";
import { LoginPage } from "./component";

export const LoginPageContainer: React.FC = () => {
  return (
    <AuthV1LoginFormContext.ApiProvider>
      <LoginPage />

      <LoginPageDataLoader />
    </AuthV1LoginFormContext.ApiProvider>
  );
};

const LoginPageDataLoader: React.FC = () => {
  //* Contexts
  const authV1LoginFormContext = React.useContext(AuthV1LoginFormContext.Context);

  //* Effects
  React.useEffect(() => {
    authV1LoginFormContext.get();
  }, []);

  return null;
};
