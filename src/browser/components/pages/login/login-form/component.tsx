import { Form, SchemaFields } from "informed";
import * as React from "react";
import { UseMutateFunction } from "react-query";
import { FormSchema } from "../../../../../shared/types/form-schema.type";
import { PostApiAuthV1LoginParams } from "../../../../services";

export type LoginFormProps = {
  onSubmit: UseMutateFunction<unknown, Error, PostApiAuthV1LoginParams>;
  schema: undefined | FormSchema;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmit, schema } = props;

  return (
    <Form
      className="site--login--login-form"
      // @ts-expect-error
      onSubmit={onSubmit}
      schema={schema}
    >
      <SchemaFields />

      <button type="submit">login</button>
    </Form>
  );
};
