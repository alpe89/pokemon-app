import * as React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";

import PageLayout from "../PageLayout/PageLayout";

const client = new ApolloClient({ uri: 'http://127.0.0.1:4000' });


const App: React.FC = () => (
  <ApolloProvider client={client}>
    <PageLayout />
  </ApolloProvider>
);

export default App;