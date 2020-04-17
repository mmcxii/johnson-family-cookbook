import React from "react";

import { IField, IDropdown } from "../../../../../../store/types";
import { Dropdown } from "../Dropdown";
import { DatepickerWrapper } from "./Datepicker.style";

interface Props {
  formTestId: string;
  field: IField;
}

export const Datepicker: React.FC<Props> = ({ field, formTestId }) => {
  const currentYear = new Date().getFullYear();
  const previousHundredYears = [];
  for (let i = 0; i < 100; i++) {
    previousHundredYears[i] = currentYear - i;
  }

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  const dropdowns: IDropdown[] = [
    {
      name: "Day",
      options: days,
    },
    {
      name: "Month",
      options: months,
    },
    {
      name: "Year",
      options: previousHundredYears,
    },
  ];

  return (
    <DatepickerWrapper>
      {dropdowns.map((dd) => (
        <article key={dd.name}>
          <Dropdown
            formTestId={formTestId}
            fieldName={field.name}
            dropdown={dd}
          />
        </article>
      ))}
    </DatepickerWrapper>
  );
};
