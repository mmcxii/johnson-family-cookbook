import * as React from "react";
import { AuthV1Queries } from "../../../queries";

export const HomePage: React.FC = () => {
  const user = AuthV1Queries.useGetUser();

  return (
    <div className="site--home">
      {user.data != null && <pre>{JSON.stringify(user.data, null, 2)}</pre>}
    </div>
  );
};
