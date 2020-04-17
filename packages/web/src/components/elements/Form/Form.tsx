import React from "react";
import { FormikErrors } from "formik";

import { IFieldGroup } from "../../../store/types";
import { Button } from "../Button";
import { FieldGroup } from "./FieldGroup";
import { StyledForm } from "./Form.style";

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
  <StyledForm>
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
  </StyledForm>
);
