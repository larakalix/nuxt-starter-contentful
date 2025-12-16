import type { DocumentNode } from "@apollo/client";
import { executeQuery, type ExecuteOptions } from "../config/execute";

export type ContentfulCollection<TItem> = {
    items?: TItem[] | null;
    total?: number | null;
    limit?: number | null;
    skip?: number | null;
};

export type ContentfulCollectionResponse<K extends string, TItem> = Record<
    K,
    ContentfulCollection<TItem>
>;

/**
 * getEntryById(id)
 * Requires query to return: { entry(id: $id) { ... } }
 */
export async function getEntryById<TEntry>(
    query: DocumentNode,
    input: { id: string },
    opts: ExecuteOptions = {}
): Promise<TEntry | null> {
    const data = await executeQuery<{ entry: TEntry | null }>(
        query,
        { id: input.id },
        opts
    );

    if (!data) return null;

    return data.entry ?? null;
}

/**
 * getEntries({ contentType, where, limit })
 * Standardizes: query should return a collection field like:
 * { pageCollection(where: $where, limit: $limit, skip: $skip, order: $order, locale: $locale) { items total limit skip } }
 *
 * We keep it schema-agnostic by requiring caller to pass the collection key string.
 */
export async function getEntries<TItem, K extends string>(
    query: DocumentNode,
    input: {
        collectionKey: K;
        where?: Record<string, unknown>;
        limit?: number;
        skip?: number;
        order?: string | string[];
        locale?: string;
    },
    opts: ExecuteOptions = {}
): Promise<{ items: TItem[]; total: number; limit?: number; skip?: number }> {
    const data = await executeQuery<ContentfulCollectionResponse<K, TItem>>(
        query,
        {
            where: input.where ?? null,
            limit: input.limit ?? null,
            skip: input.skip ?? null,
            order: input.order ?? null,
            locale: input.locale ?? null,
        },
        opts
    );

    const col = data?.[input.collectionKey];
    const items = (col?.items ?? []) as TItem[];

    return {
        items,
        total: Number(col?.total ?? items.length),
        limit: col?.limit ?? undefined,
        skip: col?.skip ?? undefined,
    };
}

/**
 * getBySlug({ contentType, slug })
 * Builds on getEntries with a slug filter.
 */
export async function getBySlug<TItem, K extends string>(
    query: DocumentNode,
    input: {
        collectionKey: K;
        slug: string;
        locale?: string;
        slugField?: string; // default "slug"
        limit?: number; // default 1
        where?: Record<string, unknown>; // merged with slug filter
    },
    opts: ExecuteOptions = {}
): Promise<TItem | null> {
    const slugField = input.slugField ?? "slug";

    const res = await getEntries<TItem, K>(
        query,
        {
            collectionKey: input.collectionKey,
            limit: input.limit ?? 1,
            locale: input.locale,
            where: {
                ...(input.where ?? {}),
                [slugField]: input.slug,
            },
        },
        opts
    );

    return res.items[0] ?? null;
}
