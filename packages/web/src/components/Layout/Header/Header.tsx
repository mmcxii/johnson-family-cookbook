import React from "react";
import { Link } from "react-router-dom";

import { Container } from "../Container";
import { Navbar } from "./Navbar";
import { Button } from "../../elements";

export const Header: React.FC = () => (
  <header className="bg-gray-400 py-4">
    <Container className="flex justify-between items-center">
      <h1 className="m-0">
        <Link to="/" className="no-underline">
          Johnson Family Cookbook
        </Link>
      </h1>

      <section className="flex items-center justify-end">
        <Navbar />

        <section className="ml-2 grid grid-cols-2 gap-2">
          <Button
            level="primary"
            label="sign up"
            testid="sign_up"
            onClick="/user/create"
            asLink
          />
          <Button
            level="secondary"
            label="login"
            testid="login"
            onClick="/login"
            asLink
          />
        </section>
      </section>
    </Container>
  </header>
);
