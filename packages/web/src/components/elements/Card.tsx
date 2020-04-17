import styled from "styled-components";

import { bg, spacing, rounded, elevation, transition } from "../../utils/style";

export const Card = styled.section`
  background-color: ${bg.card};
  padding: ${spacing[4]};
  border-radius: ${rounded};
  ${elevation[2]};
  ${transition({})};
`;
