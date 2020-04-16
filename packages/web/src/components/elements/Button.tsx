/* eslint-disable @typescript-eslint/indent */
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick: any;
  label: string;
  testid: string;
  level?: "primary" | "secondary" | "tertiary";
  asLink?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  onClick,
  label,
  testid,
  level = "primary",
  asLink = false,
  className = "",
}) => {
  const modifiers = `text-${level === "primary" ? "white" : "gray-900"} ${
    // eslint-disable-next-line no-nested-ternary
    level === "primary"
      ? "bg-gray-600"
      : level === "secondary"
      ? "bg-gray-300"
      : ""
  } hover:bg-gray-${
    // eslint-disable-next-line no-nested-ternary
    level === "primary" ? "800" : level === "secondary" ? "600" : "300"
  } ${level === "secondary" ? "hover:text-white" : ""} ${className}`;

  return asLink ? (
    <Link
      to={onClick}
      data-testid={`${testid}_button`}
      className={`inline-block px-4 py-2 text-center capitalize rounded-lg ${modifiers}`}
    >
      {label}
    </Link>
  ) : (
    <button
      type="button"
      className={`px-4 py-2 text-center capitalize rounded-lg ${modifiers}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
