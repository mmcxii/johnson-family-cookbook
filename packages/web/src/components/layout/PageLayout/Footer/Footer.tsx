import React from "react";
import styled from "styled-components";

import { Container } from "../Container";
import { spacing, bg } from "../../../../utils/style";

export const Footer: React.FC = () => (
  <FooterWrapper>
    <Container>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <p>Nich Secord &copy;2019 -{new Date().getFullYear()}</p>
    </Container>
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding: ${spacing[4]} 0;
  background-color: ${bg.headerFooter};
`;
