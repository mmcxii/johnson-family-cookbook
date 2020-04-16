import React from "react";

import { Container } from "../Container";

export const Footer: React.FC = () => (
  <footer className="mt-auto py-4 px-4 bg-gray-400">
    <Container>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <p>Nich Secord &copy;2019 -{new Date().getFullYear()}</p>
    </Container>
  </footer>
);
