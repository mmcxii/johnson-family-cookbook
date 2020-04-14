import React from "react";
import { NavLink, Link } from "react-router-dom";

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

      <Link to="/user/create" data-testid="create-account_button">
        Sign Up
      </Link>
      <Link to="/login" data-testid="login_button">
        Login
      </Link>
    </nav>
  );
};
