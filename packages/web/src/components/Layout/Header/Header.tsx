import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container } from "../Container";
import { Navbar } from "./Navbar";
import { Button } from "../../elements";
import { spacing, bg } from "../../../utils/style";

export const Header: React.FC = () => (
  <HeaderWrapper>
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
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  background-color: ${bg.headerFooter};
  padding: ${spacing[4]} 0;
`;

const Logo = styled.h1`
  margin: ${spacing[0]};
  text-align: center;

  > a {
    text-decoration: none;
  }
`;

const ButtonGroup = styled.section`
  padding-top: ${spacing[4]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[2]};
`;
