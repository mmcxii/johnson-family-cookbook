import React from "react";
import { Form as FormikForm, FormikErrors } from "formik";

import { IFieldGroup } from "../../store/types";
import { Button } from "./Button";
import { FieldGroup } from "./FieldGroup";

interface Props {
  testId: string;
  submitLabel?: string;
  fieldGroups: IFieldGroup[];
  errors: FormikErrors<any>;
}

export const Form: React.FC<Props> = ({
  testId,
  submitLabel = testId,
  fieldGroups,
  errors,
}) => (
  <FormikForm className="flex flex-col">
    {fieldGroups.map((fieldGroup) => (
      <FieldGroup {...fieldGroup} testId={testId} errors={errors} />
    ))}
    <Button
      label={submitLabel}
      testid={`${testId}_form__submit`}
      submit
      floating
      level="primary"
    />
  </FormikForm>
);
