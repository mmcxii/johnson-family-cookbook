import React from "react";

import { Container } from "../Container";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => (
  <footer className={styles.main}>
    <Container>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <p>Nich Secord &copy;2019 -{new Date().getFullYear()}</p>
    </Container>
  </footer>
);
