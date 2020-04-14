import React from "react";
import { Formik, Form, Field } from "formik";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";

interface Props {
  createUser: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<ExecutionResult<any>>;
}

export const CreateUserForm: React.FC<Props> = ({ createUser }) => (
  <Formik
    initialValues={{
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthday: "",
      genderCode: "",
      permissionLevelCode: "",
    }}
    onSubmit={async (values, { setErrors }) => {
      const errors: { [key: string]: string } = {};
      const { confirmPassword, ...vals } = values;
      if (confirmPassword !== vals.password) {
        return;
      }

      const { data } = await createUser({ variables: { data: vals } });

      if (data.createUser.status === "ERROR") {
        errors.email = data.createUser.message;
        setErrors(errors);
      }
    }}
  >
    {({ values, errors }) => {
      const fields = Object.keys(values);
      return (
        <Form>
          {fields.map((v) => (
            <div key={v}>
              <Field
                name={v}
                data-testid={`create-account_form__${v}-input`}
                placeholder={v}
                type={
                  v.toLowerCase().includes("password") ? "password" : "text"
                }
              />
              {v === "email" && errors.email && (
                <p data-testid="create-account_form__email-error">
                  {errors.email}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            data-testid="create-account_form__submit-button"
          >
            Create Account
          </button>
        </Form>
      );
    }}
  </Formik>
);
