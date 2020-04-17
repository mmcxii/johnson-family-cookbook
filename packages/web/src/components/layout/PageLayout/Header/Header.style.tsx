import styled from "styled-components";

import { bg, spacing } from "../../../../utils/style";
import { Columns } from "../../Columns";
import { StyledButton } from "../../../elements/Button/Button.style";

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

export const ButtonGroup = styled(Columns)`
  padding-top: ${spacing[3]};

  > ${StyledButton} {
    margin: 0 ${spacing[2]};
  }
`;
