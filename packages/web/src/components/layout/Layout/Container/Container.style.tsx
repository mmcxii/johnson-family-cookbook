import styled, { css } from "styled-components";

export interface Props {
  smCol?: boolean;
}

export const StyledContainer = styled.div<Props>`
  --margin: 0.5rem;
  margin: 0 var(--margin);

  ${(props) =>
    props.smCol &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

  @media screen and (min-width: 576px) {
    --margin: 1rem;
  }
  @media screen and (min-width: 768px) {
    --margin: 2rem;
  }
  @media screen and (min-width: 992px) {
    --margin: 4rem;
  }
  @media screen and (min-width: 1200px) {
    --margin: 20%;
  }
`;
