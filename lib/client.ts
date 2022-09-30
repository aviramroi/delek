import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "",
  link: new HttpLink({
    uri: "https://zofim-delek.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "PbfMO9GPlimWn5B0cVNQkKa93hfvOvtLIucVyxu5LsDI3ZtujOHNwhhCBE7jieTk",
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
