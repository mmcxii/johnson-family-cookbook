import * as React from "react";
import { AuthV1Queries } from "../../../../queries";
import { RegisterUserForm, RegisterUserFormProps } from "./component";

export type RegisterUserFormContainerProps = Omit<RegisterUserFormProps, "onSubmit" | "schema">;

export const RegisterUserFormContainer: React.FC<RegisterUserFormContainerProps> = (props) => {
  //* Queries
  const registerUserSchema = AuthV1Queries.schemas.useGetRegisterUserSchema();
  const registerUser = AuthV1Queries.usePostRegisterUser();

  //* Variables
  const { data } = registerUserSchema;
  const { mutate } = registerUser;

  return <RegisterUserForm {...props} onSubmit={mutate} schema={data} />;
};
