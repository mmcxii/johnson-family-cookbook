import styled from "styled-components";
import { Field } from "formik";

export const StyledDropdown = styled(Field).attrs({ as: "select" })`
  text-transform: capitalize;
`;
