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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export const Form: React.FC<Props> = ({
  testId,
  submitLabel = testId,
  fields,
  errors,
  setFieldValue,
}) => {
  return (
    <FormikForm className="flex flex-col">
      {fields.map((field) => (
        <Input
          formTestId={testId}
          field={field}
          errors={errors}
          key={field.name}
          setFieldValue={setFieldValue}
        />
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
