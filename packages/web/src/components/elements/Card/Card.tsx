import React from "react";

import { StyledCard, CardTitle } from "./Card.style";

interface Props {
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: React.ReactNode;
}

export const Card: React.FC<Props> = ({
  content,
  title,
  titleLevel = "h2",
}) => (
  <StyledCard>
    <CardTitle as={titleLevel}>{title}</CardTitle>
    {content}
  </StyledCard>
);
