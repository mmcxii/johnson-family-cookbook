import * as React from "react";
import { AuthV1LoginFormContext } from "../../../../contexts";
import { LoginForm, LoginFormProps } from "./component";

export type LoginFormContainerProps = Omit<
  LoginFormProps,
  "getError" | "getState" | "onSubmit" | "postError" | "postState" | "schema"
>;

export const LoginFormContainer: React.FC<LoginFormContainerProps> = (props) => {
  //* Contexts
  const authV1LoginFormContext = React.useContext(AuthV1LoginFormContext.Context);

  //* Variables
  const { post } = authV1LoginFormContext;
  const { schema } = authV1LoginFormContext.data;
  const [getState, postState] = [
    authV1LoginFormContext.state.get,
    authV1LoginFormContext.state.post,
  ];
  const [getError, postError] = [
    authV1LoginFormContext.error.get,
    authV1LoginFormContext.error.post,
  ];

  return (
    <LoginForm
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
