import React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

import { CreateUserForm } from "./CreateUserForm";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
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

export const CreateUserFormContainer: React.FC = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return <CreateUserForm createUser={createUser} />;
};
