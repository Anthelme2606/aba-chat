import RootLayout from "./layout";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ApolloProvider>
  );
}
export default MyApp;
