import React from "react";

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import {
  spacing,
  rounded,
  text,
  bg,
  transition,
  elevation,
} from "../../../utils/style";

export const ButtonStyle = styled(
  ({
    floating,
    asLink = false,
    onClick,
    label,
    testId = label,
    submit = false,
    ...rest
  }) =>
    asLink ? (
      <Link data-testid={testId} to={onClick} {...rest}>
        {label}
      </Link>
    ) : (
      // eslint-disable-next-line react/button-has-type
      <button
        data-testid={testId}
        onClick={onClick}
        type={submit ? "submit" : "button"}
        {...rest}
      >
        {label}
      </button>
    ),
)`
    /*
    * Variables
    */
    --textColor:'';
    --bgColor:'';
  
    /*
    * Common Styles
    */
    padding: ${spacing[2]} ${spacing[4]};
    text-align: center;
    border-radius: ${rounded};
    text-transform: capitalize;
    cursor: pointer;
    color: var(--textColor);
    background-color: var(--bgColor);
    ${transition({})};
  
    /*
    * Link and Button specific styles
    */
    ${(props) =>
      props.asLink
        ? css`
            text-decoration: none;
          `
        : css`
          border none;
        `}
  
    /*
    * Level specific styles
    */
    ${(props) => {
      switch (props.level) {
        case "primary":
          return css`
            --textColor: ${text.button.primary.default};
            --bgColor: ${bg.button.primary.default};

            &:hover {
              --bgColor: ${bg.button.primary.hover};
            }
          `;
        case "secondary":
          return css`
            --textColor: ${text.button.default};
            --bgColor: ${bg.button.secondary.default};

            &:hover {
              --textColor: ${text.button.secondary.hover};
              --bgColor: ${bg.button.secondary.hover};
            }
          `;
        case "tertiary":
          return css`
            --textColor: ${text.button.default};
            --bgColor: ${bg.button.tertiary.default};

            &:hover {
              --bgColor: ${bg.button.tertiary.hover};
            }
          `;

        default:
          return css``;
      }
    }}

    /*
    * Common modification options
    */
    ${(props) =>
      props.floating &&
      css`
        ${elevation[2]}
      `}
`;
