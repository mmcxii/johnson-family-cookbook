import React from "react";
import { FormikErrors } from "formik";

import { IFieldGroup } from "../../../../store/types";
import { Input } from "./Input";
import {
  StyledFieldGroup,
  FGTitle,
  FGDescription,
  FGFields,
} from "./FieldGroup.style";

interface Props extends IFieldGroup {
  testId: string;
  errors: FormikErrors<any>;
}

export const FieldGroup: React.FC<Props> = ({
  fields,
  testId,
  errors,
  description,
  title,
}) => (
  <StyledFieldGroup>
    {title && <FGTitle>{title}</FGTitle>}
    {description && <FGDescription>{description}</FGDescription>}

    <FGFields>
      {fields.map((field) => (
        <Input
          formTestId={testId}
          field={field}
          errors={errors}
          key={field.name}
        />
      ))}
    </FGFields>
  </StyledFieldGroup>
);
