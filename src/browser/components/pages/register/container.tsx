import * as React from "react";
import { AuthV1RegisterUserFormContext } from "../../../contexts";
import { RegisterPage } from "./component";

export const RegisterPageContainer: React.FC = () => {
  return (
    <AuthV1RegisterUserFormContext.ApiProvider>
      <RegisterPage />

      <RegisterPageDataLoader />
    </AuthV1RegisterUserFormContext.ApiProvider>
  );
};

const RegisterPageDataLoader: React.FC = () => {
  //* Contexts
  const authV1RegisterUserFormContext = React.useContext(AuthV1RegisterUserFormContext.Context);

  //* Effects
  React.useEffect(() => {
    authV1RegisterUserFormContext.get();
  }, []);

  return null;
};
