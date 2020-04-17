/* eslint-disable @typescript-eslint/indent */
import React from "react";

import { ButtonStyle } from "./Button.style";

interface Props {
  onClick?: any;
  label: string;
  testid?: string;
  level: "primary" | "secondary" | "tertiary";
  asLink?: boolean;
  submit?: boolean;
  floating?: boolean;
}

export const Button: React.FC<Props> = (props) => <ButtonStyle {...props} />;
