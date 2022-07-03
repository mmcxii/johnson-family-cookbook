import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { RegisterUserForm, RegisterUserFormProps } from "./component";

export type RegisterUserFormContainerProps = Omit<RegisterUserFormProps, "schema">;

export const RegisterUserFormContainer: React.FC<RegisterUserFormContainerProps> = (props) => {
  //* Queries
  const registerUserSchemaResponse = AuthV1Queries.useGetRegisterUserSchema();

  //* Variables
  const { data } = registerUserSchemaResponse;

  return <RegisterUserForm {...props} schema={data} />;
};
