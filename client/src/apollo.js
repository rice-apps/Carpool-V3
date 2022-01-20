// Apollo Client Setup
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/link-context';

// Apollo Subscriptions Setup
import { GRAPHQL_URL, SERVICE_URL } from './config';

// Wraps our requests with a token if one exists
// Copied from: https://www.apollographql.com/docs/react/v3.0-beta/networking/authentication/
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// HTTP Backend Link
const httpLink = new HttpLink({
    uri: GRAPHQL_URL
});

// Setup cache
const cache = new InMemoryCache();

// Initialize Client
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

// Initial local state
const initialState = {
    service: SERVICE_URL,
    user: {
        recentUpdate: false,
        _id: ''
    }
}

// Initialize cache with a state
cache.writeQuery({
    query: gql`
        query InitialState {
            service
            user {
                recentUpdate
                _id
            }
        }
  `,
    data: initialState
});