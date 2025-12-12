import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { PersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { createHash } from "crypto";

const {
    CONTENTFUL_SPACE_ID: spaceId,
    CONTENTFUL_ENVIRONMENT_ID: environmentId = "master",
    CONTENTFUL_CDA_TOKEN: accessToken,
    CONTENTFUL_PREVIEW_MODE: previewMode = false,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: previewAccessToken,
} = process.env;

if (!spaceId || !accessToken) {
    console.warn(
        "[contentful] CONTENTFUL_SPACE_ID or CONTENTFUL_CDA_TOKEN is not set. " +
            "Contentful queries will fail."
    );
}

const CONTENTFUL_GRAPHQL_URL =
    "https://graphql.contentful.com/content/v1/spaces/";

const httpLink = new HttpLink({
    uri: `${CONTENTFUL_GRAPHQL_URL}${spaceId}/environments/${environmentId}`,
});

const persistedQueriesLink = new PersistedQueryLink({
    sha256: (query: string) => createHash("sha256").update(query).digest("hex"),
    useGETForHashedQueries: true,
});

const authLink = new SetContextLink((previousContext) => {
    const token = previewMode === "true" ? previewAccessToken : accessToken;

    return {
        ...previousContext,
        headers: {
            ...previousContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const contentfulClient = new ApolloClient({
    link: ApolloLink.from([authLink, persistedQueriesLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: "cache-first",
        },
    },
});

// Alternative client for preview mode
const previewAuthLink = new SetContextLink((previousContext) => ({
    headers: {
        ...previousContext.headers,
        authorization: `Bearer ${previewAccessToken}`,
    },
}));

export const contentfulPreviewClient = new ApolloClient({
    link: ApolloLink.from([previewAuthLink, persistedQueriesLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: "no-cache",
        },
    },
});

// Helper function to get the appropriate client
export const getContentfulClient = (preview = false) => {
    return preview ? contentfulPreviewClient : contentfulClient;
};
