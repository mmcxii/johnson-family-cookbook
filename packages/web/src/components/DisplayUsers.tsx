import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  query {
    getAllUsers {
      payload {
        users {
          email
        }
      }
    }
  }
`;

export const DisplayUsers: React.FC = () => {
  const { data, loading, called } = useQuery(QUERY);

  return (
    <div>
      data:
      {called && loading ? 'loading...' : JSON.stringify(data)}
    </div>
  );
};
