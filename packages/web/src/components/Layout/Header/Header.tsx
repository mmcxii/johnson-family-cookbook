import React from "react";

import { Container } from "../Container";
import styles from "./Header.module.scss";

export const Header: React.FC = () => (
  <header>
    <Container>
      <h1 className={styles.logo}>Johnson Family Cookbook</h1>
    </Container>
  </header>
);
