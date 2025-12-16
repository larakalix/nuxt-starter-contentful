import type { ApolloClient } from "@apollo/client/core";

type Resolver = (preview: boolean) => ApolloClient;

let _resolver: Resolver | null = null;

export function setContentfulClientResolver(resolver: Resolver) {
    if (_resolver) return;
    _resolver = resolver;
}

export function getContentfulClient(preview = false) {
    if (!_resolver) {
        throw new Error(
            "[contentful] Client resolver not set. Import the runtime module first (astro/nuxt)."
        );
    }
    return _resolver(preview);
}
