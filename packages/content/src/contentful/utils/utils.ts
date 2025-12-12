import type { ContentfulEntry } from "../../types";

interface CollectionField {
    items: ContentfulEntry<unknown>[];
    total?: number;
}

function isContentfulEntry(value: unknown): value is ContentfulEntry<unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        "sys" in value &&
        typeof (value as ContentfulEntry<unknown>).sys === "object"
    );
}

function isCollectionField(value: unknown): value is CollectionField {
    return (
        typeof value === "object" &&
        value !== null &&
        "items" in value &&
        Array.isArray((value as CollectionField).items)
    );
}

export const cleanContentfulEntry = <T = Record<string, unknown>>(
    entry: ContentfulEntry<T>
): T => {
    const result: Record<string, unknown> = {};
    let total = 0;

    Object.entries(entry).forEach(([key, field]) => {
        // The GraphQL API adds `Collection` at the end of fields that are an array, for example: `topicsCollection`.
        // That part is eliminated and left as `items` to keep consistency with the content model
        if (key.includes("Collection") && isCollectionField(field)) {
            if (field.total && field.total > total) {
                total = field.total;
            }

            Object.assign(result, {
                ...(field.total && { total }),
                [key.replace("Collection", "")]: field.items
                    .filter((item): item is ContentfulEntry<unknown> =>
                        Boolean(item)
                    )
                    .map((item) => cleanContentfulEntry(item)),
            });
            return;
        }

        // Handle nested ContentfulEntry objects
        if (isContentfulEntry(field)) {
            result[key] = cleanContentfulEntry(field);
            return;
        }

        // Handle plain objects (but not arrays or null)
        if (
            field &&
            typeof field === "object" &&
            !Array.isArray(field) &&
            field.constructor === Object
        ) {
            result[key] = cleanContentfulEntry(
                field as unknown as ContentfulEntry<Record<string, unknown>>
            );
            return;
        }

        // Handle primitive values and arrays
        result[key] = field;
    });

    return result as T;
};
