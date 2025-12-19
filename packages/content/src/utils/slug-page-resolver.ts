import { getPageByPostId, getPageBySlug } from "../contentful/services";
import type { FunnelGenericPage } from "../types";

export type PageResult = FunnelGenericPage | null;

export type ResolverCtx = {
    slug: string; // "blog/post-id"
    segments: string[]; // ["blog", "post-id"]
};

export type Resolver = (ctx: ResolverCtx) => Promise<PageResult>;

export const pickResolver = (
    ctx: ResolverCtx
): { key: string; load: Resolver } => {
    // /blog/post-id
    if (ctx.segments[0] === "blog" && ctx.segments[1]) {
        const slug = ctx.segments[0];
        const postId = ctx.segments.slice(1).join("/"); // supports nested if needed

        return {
            key: `post:${postId}`,
            load: () => getPageByPostId(slug, postId),
        };
    }

    return {
        key: `page:${ctx.slug}`,
        load: () => getPageBySlug(ctx.slug),
    };
};
