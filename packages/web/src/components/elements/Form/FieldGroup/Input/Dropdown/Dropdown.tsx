import React from "react";

import { IDropdown } from "../../../../../../store/types";
import { StyledDropdown } from "./Dropdown.style";

interface Props {
  formTestId: string;
  fieldName: string;
  dropdown: IDropdown;
}

export const Dropdown: React.FC<Props> = ({
  dropdown,
  formTestId,
  fieldName,
}) => (
  <StyledDropdown
    name={fieldName + dropdown.name}
    data-testid={`${formTestId}_form__${fieldName + dropdown.name}-input`}
  >
    <option disabled>{dropdown.name}</option>
    {dropdown.options.map((o) => (
      <option value={o} key={o}>
        {o}
      </option>
    ))}
  </StyledDropdown>
);
