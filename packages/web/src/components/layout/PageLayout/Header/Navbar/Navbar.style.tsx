import styled from "styled-components";

import { spacing } from "../../../../../utils/style";

export const StyledNav = styled.nav`
  padding-top: ${spacing[3]};
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  text-transform: capitalize;
  list-style: none;
`;
