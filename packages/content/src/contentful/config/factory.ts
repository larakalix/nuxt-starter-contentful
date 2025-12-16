import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { PersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "js-sha256";

export const CONTENTFUL_GRAPHQL_URL = "https://graphql.contentful.com/content/v1/spaces/";

export type BuiltClients = {
    delivery: ApolloClient;
    preview: ApolloClient;
};

export function buildContentfulClients(opts: {
    graphqlUrl: string;
    deliveryToken?: string;
    previewToken?: string;
}): BuiltClients {
    const httpLink = new HttpLink({ uri: opts.graphqlUrl });
    const persistedQueriesLink = new PersistedQueryLink({
        sha256: (query: string) => sha256(query),
        useGETForHashedQueries: true,
    });

    const deliveryAuthLink = new SetContextLink((prev) => ({
        ...prev,
        headers: {
            ...prev.headers,
            authorization: opts.deliveryToken
                ? `Bearer ${opts.deliveryToken}`
                : "",
        },
    }));

    const previewAuthLink = new SetContextLink((prev) => ({
        ...prev,
        headers: {
            ...prev.headers,
            authorization: opts.previewToken
                ? `Bearer ${opts.previewToken}`
                : "",
        },
    }));

    const delivery = new ApolloClient({
        link: ApolloLink.from([
            deliveryAuthLink,
            persistedQueriesLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
        defaultOptions: { query: { fetchPolicy: "cache-first" } },
    });

    const preview = new ApolloClient({
        link: ApolloLink.from([
            previewAuthLink,
            persistedQueriesLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
        defaultOptions: { query: { fetchPolicy: "no-cache" } },
    });

    return { delivery, preview };
}
