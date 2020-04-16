import React from "react";
import { Formik } from "formik";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";

import { IField } from "../../../store/types";
import { Form, Card } from "../../elements";

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
      permissionLevelCode: "User",
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
    {({ errors }) => {
      const fields: IField[] = [
        {
          name: "email",
        },
        {
          name: "password",
          type: "password",
        },
        {
          name: "confirmPassword",
          formattedName: "Confirm Password",
          type: "password",
          placeholder: "Reenter your password",
        },
        {
          name: "firstName",
          formattedName: "first name",
        },
        {
          name: "lastName",
          formattedName: "last name",
        },
        {
          name: "genderCode",
          formattedName: "gender",
          type: "radio",
          radioOptions: ["Male", "Female", "Other"],
        },
      ];

      return (
        <Card>
          <Form
            testId="sign_up"
            submitLabel="sign up"
            fields={fields}
            errors={errors}
          />
        </Card>
      );
    }}
  </Formik>
);
