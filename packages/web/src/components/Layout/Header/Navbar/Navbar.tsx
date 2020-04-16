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
    <nav>
      <ul className="flex justify-evenly> capitalize px-2">
        {pages.map((p) => (
          <li key={p.link} className="text-gray-200">
            <NavLink
              exact
              to={p.link}
              className="px-1 hover:text-gray-500"
              activeClassName="text-gray-700 hover:text-gray-700"
            >
              {p.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
