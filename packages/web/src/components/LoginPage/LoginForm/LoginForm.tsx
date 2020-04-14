import React from "react";
import { Formik, Form, Field } from "formik";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";

interface Props {
  login: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<ExecutionResult<any>>;
}

export const LoginForm: React.FC<Props> = ({ login }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={async (values, { setErrors }) => {
      const errors = { email: "" };
      const { data } = await login({ variables: { data: values } });

      if (data.login.status === "ERROR") {
        errors.email = data.login.message;
      }

      setErrors(errors);
    }}
  >
    {({ values, errors }) => (
      <>
        <Form>
          {Object.keys(values).map((v) => (
            <div key={v}>
              <Field
                name={v}
                placeholder={v}
                data-testid={`login_form__${v}_input`}
                type={v === "password" ? v : "text"}
              />
              {v === "email" && errors.email && (
                <p data-testid="login_form__error_message">{errors.email}</p>
              )}
            </div>
          ))}
          <button type="submit" data-testid="login_form__submit_button">
            Login
          </button>
        </Form>
      </>
    )}
  </Formik>
);
