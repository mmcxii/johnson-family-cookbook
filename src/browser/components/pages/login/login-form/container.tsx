import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { LoginForm, LoginFormProps } from "./component";

export type LoginFormContainerProps = Omit<LoginFormProps, "schema">;

export const LoginFormContainer: React.FC<LoginFormContainerProps> = (props) => {
  //* Queries
  const loginSchemaResponse = AuthV1Queries.useGetLoginSchema();

  //* Variables
  const { data } = loginSchemaResponse;

  return <LoginForm {...props} schema={data} />;
};
