import React from "react";
import { Form as FormikForm, FormikErrors } from "formik";

import { IField } from "../../store/types";
import { Input } from "./Input";
import { Button } from "./Button";

interface Props {
  testId: string;
  submitLabel?: string;
  fields: IField[];
  errors: FormikErrors<any>;
}

export const Form: React.FC<Props> = ({
  testId,
  submitLabel = testId,
  fields,
  errors,
}) => {
  return (
    <FormikForm className="flex flex-col">
      {fields.map((field) => (
        <Input formTestId={testId} field={field} errors={errors} />
      ))}
      <Button
        label={submitLabel}
        testid={`${testId}_form__submit`}
        submit
        floating
      />
    </FormikForm>
  );
};
