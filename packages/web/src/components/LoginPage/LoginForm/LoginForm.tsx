import React from "react";
import { Formik } from "formik";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";

import { IField } from "../../../store/types";
import { Card, Form } from "../../elements";

interface Props {
  login: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<ExecutionResult<any>>;
}

export const LoginForm: React.FC<Props> = ({ login }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={async (values, { setErrors }) => {
      const errors: { [key: string]: string } = {};

      if (values.email === "") {
        errors.email = "Email is required";
        return setErrors(errors);
      }
      if (values.password === "") {
        errors.password = "Password is required";
        return setErrors(errors);
      }

      const { data } = await login({ variables: { data: values } });

      if (data.login.status === "ERROR") {
        errors.email = data.login.message;
      }

      return setErrors(errors);
    }}
  >
    {({ errors, setFieldValue }) => {
      const fields: IField[] = [
        {
          name: "email",
        },
        {
          name: "password",
          type: "password",
        },
      ];

      return (
        <Card>
          <Form
            testId="login"
            fields={fields}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        </Card>
      );
    }}
  </Formik>
);
