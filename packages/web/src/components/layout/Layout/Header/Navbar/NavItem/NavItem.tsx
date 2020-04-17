import React from "react";

import { INavItem } from "../../../../../../store/types";
import { StyledItem, NavLink } from "./NavItem.style";

interface Props extends INavItem {}

export const NavItem: React.FC<Props> = ({ name, link }) => (
  <StyledItem>
    <NavLink exact to={link}>
      {name}
    </NavLink>
  </StyledItem>
);
