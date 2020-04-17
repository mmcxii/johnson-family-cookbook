import React from "react";
import { Link } from "react-router-dom";

import { Container } from "../Container";
import { Navbar } from "./Navbar";
import { Button } from "../../../elements";
import { StyledHeader, Logo, ButtonGroup } from "./Header.style";

export const Header: React.FC = () => (
  <StyledHeader>
    <Container smCol>
      <Logo>
        <Link to="/">Johnson Family Cookbook</Link>
      </Logo>

      <Navbar />

      <ButtonGroup>
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
      </ButtonGroup>
    </Container>
  </StyledHeader>
);
