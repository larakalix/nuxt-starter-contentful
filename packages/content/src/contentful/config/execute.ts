import type { DocumentNode } from "graphql";
import { getContentfulClient } from "./runtime";

export type ExecuteOptions = {
    preview?: boolean;
    errorMessage?: string;
    fetchPolicy?: "cache-first" | "no-cache" | "network-only" | "cache-only";
};

export async function executeQuery<TData>(
    query: DocumentNode,
    variables: Record<string, unknown> = {},
    opts: ExecuteOptions = {}
): Promise<TData | undefined> {
    const client = getContentfulClient(Boolean(opts.preview));

    try {
        const res = await client.query<TData>({
            query,
            variables,
            fetchPolicy: opts.fetchPolicy ?? "no-cache",
        });

        return res.data;
    } catch (err) {
        console.error("[contentful.executeQuery]", err);

        const msg = opts.errorMessage ?? "Failed to fetch data from Contentful";
        if (err instanceof Error) throw new Error(`${msg}: ${err.message}`);
        throw new Error(`${msg}: ${String(err)}`);
    }
}
