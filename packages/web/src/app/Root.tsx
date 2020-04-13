import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloWrapper } from '../lib/Apollo';
import { App } from './App';

export const Root: React.FC = () => (
  <ApolloWrapper>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloWrapper>
);
