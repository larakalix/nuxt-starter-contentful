import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { setContentfulClientResolver } from "@starter/content";

function makeClient(uri: string) {
    return new ApolloClient({
        link: new HttpLink({ uri, credentials: "same-origin" }),
        cache: new InMemoryCache(),
    });
}

export default defineNuxtPlugin(() => {
    const delivery = makeClient("/api/contentful/graphql");
    const preview = makeClient("/api/contentful/graphql?preview=1");

    setContentfulClientResolver((isPreview) =>
        isPreview ? preview : delivery
    );
});
