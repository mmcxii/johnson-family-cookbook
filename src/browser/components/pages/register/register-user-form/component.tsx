import { Form, SchemaFields } from "informed";
import * as React from "react";
import { FormSchema } from "../../../../../shared/types/form-schema.type";

export type RegisterUserFormProps = {
  schema: undefined | FormSchema;
};

export const RegisterUserForm: React.FC<RegisterUserFormProps> = (props) => {
  const { schema } = props;

  return (
    <Form className="site--register--register-user-form" schema={schema}>
      <SchemaFields />

      <button type="submit">register</button>
    </Form>
  );
};
