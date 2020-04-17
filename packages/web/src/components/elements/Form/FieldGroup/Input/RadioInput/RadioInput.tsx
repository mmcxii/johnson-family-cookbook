import React from "react";

import { IField } from "../../../../../../store/types";
import { RadioButton } from "./RadioInput.style";
import { Columns } from "../../../../../layout";

interface Props {
  field: IField;
  formTestId: string;
}

export const RadioInput: React.FC<Props> = ({ field, formTestId }) => (
  <Columns
    items={field.radioOptions!.map((ro) => (
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
  />
);
