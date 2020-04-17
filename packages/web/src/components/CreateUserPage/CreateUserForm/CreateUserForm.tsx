import React from "react";
import { Formik } from "formik";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";

import { IFieldGroup } from "../../../store/types";
import { Form, Card } from "../../elements";

interface Props {
  createUser: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<ExecutionResult<any>>;
}

export const CreateUserForm: React.FC<Props> = ({ createUser }) => (
  <Formik
    initialValues={{
      permissionLevelCode: "User",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      genderCode: "",
      birthdayDay: "",
      birthdayMonth: "",
      birthdayYear: "",
    }}
    onSubmit={async (values, { setErrors }) => {
      const errors: { [key: string]: string } = {};
      const {
        confirmPassword,
        birthdayDay,
        birthdayMonth,
        birthdayYear,
        ...vals
      } = values;
      if (confirmPassword !== vals.password) {
        return;
      }
      const birthday = `${birthdayDay} ${birthdayMonth}, ${birthdayYear}`;

      const { data } = await createUser({
        variables: { data: { ...vals, birthday } },
      });

      if (data.createUser.status === "ERROR") {
        errors.email = data.createUser.message;
        setErrors(errors);
      }
    }}
  >
    {({ errors }) => {
      const fieldGroups: IFieldGroup[] = [
        {
          title: "account information",
          description:
            "You will use this email and password to sign in to the Cookbook.",
          fields: [
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
          ],
        },
        {
          title: "personal information",
          description: "Complete the rest of your profile.",
          fields: [
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
            {
              name: "birthday",
              type: "date",
            },
          ],
        },
      ];

      return (
        <Card
          title="sign up"
          content={
            <Form
              testId="sign_up"
              submitLabel="sign up"
              fieldGroups={fieldGroups}
              errors={errors}
            />
          }
        />
      );
    }}
  </Formik>
);
