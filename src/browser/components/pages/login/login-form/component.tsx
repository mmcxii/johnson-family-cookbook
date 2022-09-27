import { Form, SchemaFields } from "informed";
import * as React from "react";
import { AuthV1LoginFormContext } from "../../../../contexts";

export type LoginFormProps = {
  getError: AuthV1LoginFormContext.ContextData["error"]["get"];
  getState: AuthV1LoginFormContext.ContextData["state"]["get"];
  onSubmit: AuthV1LoginFormContext.ContextData["post"];
  postError: AuthV1LoginFormContext.ContextData["error"]["get"];
  postState: AuthV1LoginFormContext.ContextData["state"]["post"];
  schema: AuthV1LoginFormContext.ContextData["data"]["schema"];
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { getState, onSubmit, schema } = props;

  //* Variables
  const isPending = getState === "idle" || getState === "loading";

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <Form className="site--login--login-form" onSubmit={onSubmit} schema={schema}>
      <SchemaFields />

      <button type="submit">login</button>
    </Form>
  );
};
