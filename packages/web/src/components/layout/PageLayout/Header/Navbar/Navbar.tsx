import React from "react";

import { INavItem } from "../../../../../store/types";
import { StyledNav, NavList } from "./Navbar.style";
import { NavItem } from "./NavItem";

export const Navbar: React.FC = () => {
  const pages: INavItem[] = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "profile",
      link: "/profile",
    },
    {
      name: "favorites",
      link: "/favorites",
    },
  ];

  return (
    <StyledNav>
      <NavList>
        {pages.map((p) => (
          <NavItem {...p} />
        ))}
      </NavList>
    </StyledNav>
  );
};
