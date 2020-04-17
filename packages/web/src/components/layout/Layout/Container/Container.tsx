import React from "react";

import { StyledContainer, Props } from "./Container.style";

export const Container: React.FC<Props> = ({ children, ...rest }) => (
  <StyledContainer {...rest}>{children}</StyledContainer>
);
