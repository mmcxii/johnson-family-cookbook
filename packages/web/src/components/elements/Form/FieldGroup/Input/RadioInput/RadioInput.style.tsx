import styled from "styled-components";
import { Field } from "formik";

import { spacing } from "../../../../../../utils/style";

export const RadioWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
`;

export const RadioButton = styled(Field).attrs({ type: "radio" })`
  margin-right: ${spacing[2]};
`;
