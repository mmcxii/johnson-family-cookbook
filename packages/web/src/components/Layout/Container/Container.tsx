import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => (
  <div className={`container mx-auto ${className}`}>{children}</div>
);
