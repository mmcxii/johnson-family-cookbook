import { Form, SchemaFields } from "informed";
import * as React from "react";
import { AuthV1RegisterUserFormContext } from "../../../../contexts";

export type RegisterUserFormProps = {
  getError: AuthV1RegisterUserFormContext.ContextData["error"]["get"];
  getState: AuthV1RegisterUserFormContext.ContextData["state"]["get"];
  onSubmit: AuthV1RegisterUserFormContext.ContextData["post"];
  postError: AuthV1RegisterUserFormContext.ContextData["error"]["get"];
  postState: AuthV1RegisterUserFormContext.ContextData["state"]["post"];
  schema: AuthV1RegisterUserFormContext.ContextData["data"]["schema"];
};

export const RegisterUserForm: React.FC<RegisterUserFormProps> = (props) => {
  const { getState, onSubmit, schema } = props;

  //* Variables
  const isPending = getState === "idle" || getState === "loading";

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <Form className="site--register--register-user-form" onSubmit={onSubmit} schema={schema}>
      <SchemaFields />

      <button type="submit">register</button>
    </Form>
  );
};
