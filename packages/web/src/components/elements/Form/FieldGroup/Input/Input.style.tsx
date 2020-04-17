import styled from "styled-components";

import { spacing, text } from "../../../../../utils/style";

export const InputWrapper = styled.article`
  padding: ${spacing[4]} 0;
`;

export const InputLabel = styled.label`
  display: block;
  padding: 0 0 ${spacing[2]} ${spacing[2]};
  text-transform: capitalize;
`;

export const InputErrorMessage = styled.p`
  padding: ${spacing[2]} 0 0 ${spacing[2]};
  color: ${text.form.errorMessage};
`;
