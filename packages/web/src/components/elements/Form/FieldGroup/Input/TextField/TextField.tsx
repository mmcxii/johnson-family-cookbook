import React from "react";

import { IField } from "../../../../../../store/types";
import { StyledField } from "./TextField.style";

interface Props {
  field: IField;
  formTestId: string;
}

export const TextField: React.FC<Props> = ({ field, formTestId }) => (
  <StyledField
    name={field.name}
    placeholder={
      field.placeholder || `Enter your ${field.formattedName || field.name}`
    }
    data-testid={`${formTestId}_form__${field.name}_input`}
    type={field.type || "text"}
    required={field.required || true}
  />
);
