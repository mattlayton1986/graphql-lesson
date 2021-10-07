import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { typeDefs, resolvers } from './graphql/resolvers';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

// Note on URIs below: localhost:5000 goes to the GraphQL server implementation
// I build on my own in my main project for this course; see 
// https://github.com/mattlayton1986/crwn-clothing/blob/main/server.js
// The crwn-clothing.com URI is the GraphQL server implementation built by the
// instructor and live-hosted for long-term use. If cloning this project to test
// please use the crwn-clothing.com URI for proper results.
const link = createHttpLink({
  uri: 'http://localhost:5000/graphql'
  // uri: 'https://crwn-clothing.com'
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
})

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
