import { Form, FormState, SchemaFields } from "informed";
import * as React from "react";
import { UseMutateFunction } from "react-query";
import { FormSchema } from "../../../../../shared/types/form-schema.type";
import { PostApiAuthV1RegisterUserParams } from "../../../../services";

export type RegisterUserFormProps = {
  onSubmit: UseMutateFunction<unknown, Error, PostApiAuthV1RegisterUserParams>;
  schema: undefined | FormSchema;
};

export const RegisterUserForm: React.FC<RegisterUserFormProps> = (props) => {
  const { onSubmit, schema } = props;

  return (
    <Form
      className="site--register--register-user-form"
      // @ts-expect-error
      onSubmit={onSubmit}
      schema={schema}
    >
      <SchemaFields />

      <button type="submit">register</button>
    </Form>
  );
};
