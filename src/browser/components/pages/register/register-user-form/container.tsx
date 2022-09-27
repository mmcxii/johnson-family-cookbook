import * as React from "react";
import { AuthV1RegisterUserFormContext } from "../../../../contexts";
import { RegisterUserForm, RegisterUserFormProps } from "./component";

export type RegisterUserFormContainerProps = Omit<
  RegisterUserFormProps,
  "getError" | "getState" | "onSubmit" | "postError" | "postState" | "schema"
>;

export const RegisterUserFormContainer: React.FC<RegisterUserFormContainerProps> = (props) => {
  //* Contexts
  const authV1RegisterUserFormContext = React.useContext(AuthV1RegisterUserFormContext.Context);

  //* Variables
  const { post } = authV1RegisterUserFormContext;
  const { schema } = authV1RegisterUserFormContext.data;
  const [getState, postState] = [
    authV1RegisterUserFormContext.state.get,
    authV1RegisterUserFormContext.state.post,
  ];
  const [getError, postError] = [
    authV1RegisterUserFormContext.error.get,
    authV1RegisterUserFormContext.error.post,
  ];

  return (
    <RegisterUserForm
      {...props}
      getError={getError}
      getState={getState}
      onSubmit={post}
      postError={postError}
      postState={postState}
      schema={schema}
    />
  );
};
