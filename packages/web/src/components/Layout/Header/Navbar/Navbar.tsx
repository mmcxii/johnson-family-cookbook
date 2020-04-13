import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";

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
      name: "login",
      link: "/login",
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {pages.map((p) => (
          <li key={p.link} className={styles.nav__item}>
            <NavLink exact to={p.link} className={styles.nav__link}>
              {p.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
