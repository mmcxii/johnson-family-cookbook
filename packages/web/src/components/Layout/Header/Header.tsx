import React from "react";

import { Container } from "../Container";
import styles from "./Header.module.scss";
import { Navbar } from "./Navbar";

export const Header: React.FC = () => (
  <header className={styles.main}>
    <Container>
      <h1 className={styles.logo}>Johnson Family Cookbook</h1>

      <Navbar />
    </Container>
  </header>
);
