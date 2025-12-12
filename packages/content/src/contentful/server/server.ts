import type {
    ContentfulCollectionResponse,
    ContentfulEntry,
} from "../../types";
import type { DocumentNode } from "@apollo/client";
import { getContentfulClient } from "../client";

export async function getFirstEntry<T>(
    query: DocumentNode,
    variables: Record<string, unknown>,
    collectionKey: string,
    preview = false,
    errorMessage = "Failed to fetch entry"
): Promise<T | null> {
    const client = getContentfulClient(preview);

    try {
        const { data } = await client.query<
            ContentfulCollectionResponse<string, ContentfulEntry<T>>
        >({
            query,
            variables: { ...variables, preview },
            fetchPolicy: "no-cache",
        });

        if (!data) return null;

        const collection = data[collectionKey];
        const items = collection?.items ?? null;

        if (!items || items.length <= 0) return null;

        return items[0] ?? null;
    } catch (err) {
        console.error("[getFirstEntry]", err);

        if (err instanceof Error) {
            throw new Error(errorMessage + ": " + err.message);
        }

        throw new Error(`${errorMessage}: ${String(err)}`);
    }
}
