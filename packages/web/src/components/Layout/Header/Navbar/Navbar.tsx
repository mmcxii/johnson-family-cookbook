import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../elements";

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
    <nav className="">
      <ul className="flex justify-evenly capitalize">
        {pages.map((p) => (
          <li key={p.link} className="px-1">
            <NavLink exact to={p.link} className="">
              {p.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <Button
        asLink
        onClick="/user/create"
        label="sign up"
        testid="create-account"
      />
      <Button
        asLink
        onClick="/login"
        label="login"
        testid="login"
        level="secondary"
      />
      <Button
        asLink
        onClick="/test"
        label="test"
        testid="test"
        level="tertiary"
      />
      <Button label="hello" testid="hello" onClick={() => alert("hello")} />
    </nav>
  );
};
