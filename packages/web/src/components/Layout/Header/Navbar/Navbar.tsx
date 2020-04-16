import React from "react";
import { NavLink } from "react-router-dom";

interface IPage {
  name: string;
  link: string;
}

export const Navbar: React.FC = () => {
  const pages: IPage[] = [
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
    <nav className="pt-3">
      <ul className="flex justify-evenly> capitalize">
        {pages.map((p) => (
          <li key={p.link} className="text-gray-200 px-1">
            <NavLink
              exact
              to={p.link}
              className="pb-1 hover:text-gray-500"
              activeClassName="text-gray-700 hover:text-gray-700 border-b-2 border-gray-500"
            >
              {p.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
