import styled from "styled-components";
import { NavLink as RRNavLink } from "react-router-dom";

import { spacing, text, transition, gray } from "../../../../../../utils/style";

export const StyledItem = styled.li`
  padding: 0 ${spacing[1]};
`;

export const NavLink = styled(RRNavLink)`
  --color: ${text.nav.inactive};

  text-decoration: none;
  color: var(--color);
  padding-bottom: ${spacing[1]};
  ${transition({})};

  &:hover {
    --color: ${text.nav.hover};
  }

  &.active {
    --color: ${text.nav.active};

    border-bottom: solid 3px ${gray[500]};
  }
`;
