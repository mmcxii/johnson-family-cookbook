import styled from "styled-components";

import {
  bg,
  spacing,
  rounded,
  elevation,
  transition,
} from "../../../utils/style";

export const StyledCard = styled.section`
  background-color: ${bg.card};
  padding: ${spacing[4]};
  border-radius: ${rounded};
  ${elevation[2]};
  ${transition({})};
`;

export const CardTitle = styled.h2`
  text-transform: capitalize;
  margin-bottom: ${spacing[4]};
`;
