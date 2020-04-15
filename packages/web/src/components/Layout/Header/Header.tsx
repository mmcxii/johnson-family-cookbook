import React from "react";
import { Link } from "react-router-dom";

import { Container } from "../Container";
import { Navbar } from "./Navbar";

export const Header: React.FC = () => (
  <header>
    <Container className="flex justify-between">
      <h1 className="m-0">
        <Link to="/" className="no-underline">
          Johnson Family Cookbook
        </Link>
      </h1>

      <Navbar />
    </Container>
  </header>
);
