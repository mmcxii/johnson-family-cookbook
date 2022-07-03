import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { LoginForm, LoginFormProps } from "./component";

export type LoginFormContainerProps = Omit<LoginFormProps, "onSubmit" | "schema">;

export const LoginFormContainer: React.FC<LoginFormContainerProps> = (props) => {
  //* Queries
  const loginSchema = AuthV1Queries.schemas.useGetLoginSchema();
  const login = AuthV1Queries.usePostLogin();

  //* Variables
  const { data } = loginSchema;
  const { mutate } = login;

  return <LoginForm {...props} onSubmit={mutate} schema={data} />;
};
