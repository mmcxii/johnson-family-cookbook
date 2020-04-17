import styled from "styled-components";
import { Field } from "formik";

import {
  spacing,
  rounded,
  elevation,
  bg,
  text,
} from "../../../../../../utils/style";

export const StyledField = styled(Field)`
  width: 100%;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${rounded};
  border: none;
  background-color: ${bg.form.input};
  color: ${text.form.input};
  ${elevation[0]};
`;
