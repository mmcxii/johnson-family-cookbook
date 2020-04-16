import React from "react";

import { Header } from "./Header";
import { Container } from "./Container";
import { Footer } from "./Footer";

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main className="py-4">
      <Container>{children}</Container>
    </main>
    <Footer />
  </>
);
