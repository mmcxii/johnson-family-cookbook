import { Form, SchemaFields } from "informed";
import * as React from "react";
import { FormSchema } from "../../../../../shared/types/form-schema.type";

export type LoginFormProps = {
  schema: undefined | FormSchema;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { schema } = props;

  return (
    <Form className="site--login--login-form" schema={schema}>
      <SchemaFields />

      <button type="submit">login</button>
    </Form>
  );
};
