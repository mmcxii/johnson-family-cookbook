import React from "react";

import { Header } from "./Header";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Main } from "./Layout.style";

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <Main>
      <Container>{children}</Container>
    </Main>
    <Footer />
  </>
);
