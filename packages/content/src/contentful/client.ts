import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { PersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "js-sha256";
import type { ContentfulConfig } from "./config/config";

const CONTENTFUL_GRAPHQL_URL =
    "https://graphql.contentful.com/content/v1/spaces/";

const _state: {
    config: ContentfulConfig | null;
    deliveryClient: ApolloClient | null;
    previewClient: ApolloClient | null;
} = {
    config: null,
    deliveryClient: null,
    previewClient: null,
};

export function setupContentful(config: ContentfulConfig | null) {
    if (!config || _state.config) return;

    _state.config = {
        environmentId: "master",
        ...config,
    };
}

export function getContentfulConfig(): ContentfulConfig {
    if (!_state.config) {
        throw new Error(
            "[contentful] Config not initialized. Please call setupContentful first."
        );
    }
    return _state.config;
}

function buildApolloClient(preview: boolean) {
    const config = getContentfulConfig();

    const {
        spaceId,
        environmentId = "master",
        cdaToken,
        previewToken,
    } = config;

    if (!spaceId || !cdaToken) {
        console.warn(
            "[contentful] spaceId/cdaToken missing. Contentful queries will fail."
        );
    }

    const httpLink = new HttpLink({
        uri: `${CONTENTFUL_GRAPHQL_URL}${spaceId}/environments/${environmentId}`,
    });

    const persistedQueriesLink = new PersistedQueryLink({
        sha256: (query: string) => sha256(query),
        useGETForHashedQueries: true,
    });

    const authLink = new SetContextLink((previousContext) => {
        const token = preview ? previewToken : cdaToken;

        return {
            ...previousContext,
            headers: {
                ...previousContext.headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    return new ApolloClient({
        link: ApolloLink.from([authLink, persistedQueriesLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: preview ? "no-cache" : "cache-first",
            },
        },
    });
}

export function getContentfulClient(preview = false) {
    if (preview) {
        if (!_state.previewClient)
            _state.previewClient = buildApolloClient(true);
        return _state.previewClient;
    }

    if (!_state.deliveryClient)
        _state.deliveryClient = buildApolloClient(false);
    return _state.deliveryClient;
}
