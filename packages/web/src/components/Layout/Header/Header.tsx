import React from "react";
import { Link } from "react-router-dom";

import { Container } from "../Container";
import styles from "./Header.module.scss";
import { Navbar } from "./Navbar";

export const Header: React.FC = () => (
  <header className={styles.main}>
    <Container>
      <h1 className={styles.logo}>
        <Link to="/">Johnson Family Cookbook</Link>
      </h1>

      <Navbar />
    </Container>
  </header>
);
