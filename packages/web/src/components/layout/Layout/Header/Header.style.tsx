import styled from "styled-components";

import { bg, spacing } from "../../../../utils/style";

export const StyledHeader = styled.header`
  background-color: ${bg.headerFooter};
  padding: ${spacing[4]} 0;
`;

export const Logo = styled.h1`
  margin: ${spacing[0]};
  text-align: center;

  > a {
    text-decoration: none;
    color: inherit;
  }
`;

export const ButtonGroup = styled.section`
  padding-top: ${spacing[4]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[2]};
`;
