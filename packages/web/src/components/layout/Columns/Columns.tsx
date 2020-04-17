import React from "react";

import { ColumnWrapper } from "./Columns.style";

interface Props {
  items: React.ReactNode[];
}

export const Columns: React.FC<Props> = ({ items, ...rest }) => (
  <ColumnWrapper {...rest}>{items}</ColumnWrapper>
);
