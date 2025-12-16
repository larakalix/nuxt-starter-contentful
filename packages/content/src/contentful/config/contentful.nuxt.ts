import { buildContentfulClients, CONTENTFUL_GRAPHQL_URL } from "./factory";
import { setContentfulClientResolver } from "./runtime";

const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_CDA_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_MODE,
} = process.env as Record<string, string | undefined>;

let _clients: ReturnType<typeof buildContentfulClients> | null = null;

function assertServerOnly() {
    if (typeof window !== "undefined") {
        throw new Error(
            "[contentful.nuxt.server] This module reads private env vars and must not be bundled for the browser."
        );
    }
}

function initOnce() {
    if (_clients) return;
    assertServerOnly();

    const envId = CONTENTFUL_ENVIRONMENT_ID ?? "master";
    const graphqlUrl = `${CONTENTFUL_GRAPHQL_URL}${CONTENTFUL_SPACE_ID}/environments/${envId}`;

    const deliveryToken =
        CONTENTFUL_PREVIEW_MODE === "true"
            ? CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : CONTENTFUL_CDA_TOKEN;

    _clients = buildContentfulClients({
        graphqlUrl,
        deliveryToken,
        previewToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    });

    setContentfulClientResolver((preview) =>
        preview ? _clients!.preview : _clients!.delivery
    );
}

// Auto-init on import
initOnce();
