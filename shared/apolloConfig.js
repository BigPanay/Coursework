import "cross-fetch/polyfill";
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('usr-sess');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = process.browser ? new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true
  }
}) : null;

const splitLink = process.browser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
) : authLink.concat(httpLink);

const clientConfig = new ApolloClient({
  link: splitLink,
  connectToDevTools: true,
  ssrMode: true,
  ssrForceFetchDelay: 200,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          post_edge: {
            keyArgs: false,

            merge(existing, incoming, {
              args: { after, first }
            }) {
              let merge;

              if (existing != undefined) {
                if (existing.pageInfo.hasNextPage) {
                  merge = {
                    ...incoming
                  }
                  merge.edges = [
                    ...existing.edges,
                    ...incoming.edges
                  ]
                  return merge;
                }

                return existing;

              } else {
                return incoming;
              }
            }
          },
          user_post_edge: {
            keyArgs: false,

            merge(existing, incoming, {
              args: { after, first }
            }) {
              let merge;

              console.log("existing", existing)
              console.log("incoming", incoming)
              console.log(after, first)
              if (existing != undefined) {
                if (after != undefined && existing.pageInfo.hasNextPage) {
                  merge = {
                    ...incoming
                  }
                  merge.edges = [
                    ...existing.edges,
                    ...incoming.edges
                  ]

                  return merge;
                } else {
                  existing = undefined;
                  return incoming
                }
              } else {
                return incoming
              }

              // if (existing != undefined) {
              //   if (after != undefined) {
              //     if (existing.pageInfo.hasNextPage) {
              //       merge = {
              //         ...incoming
              //       }
              //       merge.edges = [
              //         ...existing.edges,
              //         ...incoming.edges
              //       ]

              //       console.log(merge);
              //       return merge;
              //     }

              //     return existing;
              //   }

              // } else {
              //   return incoming;
              // }
            }
          }
        }
      }
    }
  }).restore(process.browser ? window.__APOLLO_STATE__ : undefined),

});

export default clientConfig;