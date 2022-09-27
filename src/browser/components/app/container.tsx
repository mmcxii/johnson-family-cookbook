import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthV1UserContext } from "../../contexts";
import { App } from "./component";

export const AppContainer: React.FC = () => {
  return (
    <AuthV1UserContext.ApiProvider>
      <BrowserRouter>
        <AppDataLoader />

        <App />
      </BrowserRouter>
    </AuthV1UserContext.ApiProvider>
  );
};

const AppDataLoader: React.FC = () => {
  //* Contexts
  const authV1UserContext = React.useContext(AuthV1UserContext.Context);

  //* Effects
  React.useEffect(() => {
    authV1UserContext.get();
  }, []);

  return null;
};
