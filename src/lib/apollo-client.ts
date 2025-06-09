import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create a simple Apollo Client
const client = new ApolloClient({
  // Link to the GraphQL API
  link: new HttpLink({
    uri: "https://graphql-pokemon2.vercel.app/",
  }),
  // Cache for storing query results
  cache: new InMemoryCache(),
});

export { client };
