"use client";

import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient, 
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";

function makeClient() {
  // Création du HttpLink pour la communication avec l'API GraphQL
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });

  // Middleware pour ajouter dynamiquement le token Authorization
  const authLink = setContext((_, { headers }) => {
    if (typeof window !== "undefined") {
     
      const token = localStorage.getItem('token');
     
      return {
        headers: {
          ...headers,
          authorization: token || "", 
        },
      };
    }
  
    return { headers };
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : authLink.concat(httpLink), 
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
