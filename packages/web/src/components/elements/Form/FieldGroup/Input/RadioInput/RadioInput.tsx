import React from "react";

import { IField } from "../../../../../../store/types";
import { RadioWrapper, RadioButton } from "./RadioInput.style";

interface Props {
  field: IField;
  formTestId: string;
}

export const RadioInput: React.FC<Props> = ({ field, formTestId }) => (
  <RadioWrapper>
    {field.radioOptions!.map((ro) => (
      <article key={ro}>
        <RadioButton
          id={field.name + ro}
          name={field.name}
          data-testid={`${formTestId}_form__${field.name}-${ro.toLowerCase()}`}
          value={ro}
        />
        <label htmlFor={field.name + ro}>{ro}</label>
      </article>
    ))}
  </RadioWrapper>
);
