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

const _contentfulConfig: { config: ContentfulConfig | null } = { config: null };

export function setupContentful(config: ContentfulConfig | null) {
    if (!config) return;

    _contentfulConfig.config = {
        environmentId: "master",
        preview: false,
        ...config,
    };
}

export function getContentfulConfig(): ContentfulConfig | null {
    if (!_contentfulConfig.config) {
        throw new Error(
            "[contentful] Config not initialized. Please setup setupContentful first."
        );
    }

    return _contentfulConfig.config as ContentfulConfig;
}

// Helper function to get the appropriate client
export function createContentfulClient(preview = false) {
    const config = getContentfulConfig();

    if (!config) {
        throw new Error(
            "[contentful] Client not initialized. Please call setupContentful first."
        );
    }

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

    const authLink = new SetContextLink((previousContext) => {
        const token = preview === true ? previewToken : cdaToken;

        return {
            ...previousContext,
            headers: {
                ...previousContext.headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    const httpLink = new HttpLink({
        uri: `${CONTENTFUL_GRAPHQL_URL}${spaceId}/environments/${environmentId}`,
    });

    const persistedQueriesLink = new PersistedQueryLink({
        sha256: (query: string) => sha256(query),
        useGETForHashedQueries: true,
    });

    const previewAuthLink = new SetContextLink((previousContext) => ({
        headers: {
            ...previousContext.headers,
            authorization: `Bearer ${previewToken}`,
        },
    }));

    const contentfulPreviewClient = new ApolloClient({
        link: ApolloLink.from([
            previewAuthLink,
            persistedQueriesLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache",
            },
        },
    });

    const contentfulClient = new ApolloClient({
        link: ApolloLink.from([authLink, persistedQueriesLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: "cache-first",
            },
        },
    });

    return preview ? contentfulPreviewClient : contentfulClient;
}

export function getContentfulClient(preview = false) {
    return createContentfulClient(preview);
}
