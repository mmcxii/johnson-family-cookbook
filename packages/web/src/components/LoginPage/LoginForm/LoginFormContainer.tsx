import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LoginForm } from "./LoginForm";

const LOGIN_MUTAION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      status
      message
      payload {
        user {
          email
        }
      }
    }
  }
`;

export const LoginFormContainer: React.FC = () => {
  const [login] = useMutation(LOGIN_MUTAION);
  return <LoginForm login={login} />;
};
