/* eslint-disable no-case-declarations */
import React from "react";
import { FormikErrors } from "formik";

import { IField } from "../../../../../store/types";
import { Datepicker } from "./Datepicker";
import { InputWrapper, InputLabel, InputErrorMessage } from "./Input.style";
import { RadioInput } from "./RadioInput";
import { TextField } from "./TextField";

interface Props {
  formTestId: string;
  field: IField;
  errors: FormikErrors<any>;
}

export const Input: React.FC<Props> = ({ formTestId, field, errors }) => (
  <InputWrapper>
    <InputLabel htmlFor={field.name}>
      {field.formattedName || field.name}
    </InputLabel>

    {(() => {
      switch (field.type) {
        case "radio":
          return <RadioInput field={field} formTestId={formTestId} />;

        case "date":
          return <Datepicker field={field} formTestId={formTestId} />;

        /**
         * <TextField /> is used as the default option
         * since it is used for text, password, and number inputs
         */
        default:
          return <TextField field={field} formTestId={formTestId} />;
      }
    })()}

    {errors[field.name] && (
      // eslint-disable-next-line react/jsx-one-expression-per-line
      <InputErrorMessage>Error: {errors[field.name]}</InputErrorMessage>
    )}
  </InputWrapper>
);
