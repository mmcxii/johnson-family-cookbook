import * as React from "react";
import { AuthV1UserContext } from "../../../contexts";

export type HomePageProps = {
  user: AuthV1UserContext.ContextData["data"]["user"];
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const { user } = props;

  return (
    <div className="site--home">{user != null && <pre>{JSON.stringify(user, null, 2)}</pre>}</div>
  );
};
