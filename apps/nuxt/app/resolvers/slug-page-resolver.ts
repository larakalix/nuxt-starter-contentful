import {
    getPageBySlug,
    getPageByPostId,
    type FunnelPage,
} from "@starter/content";

type PageResult = FunnelPage | null;

type ResolverCtx = {
    slug: string; // "blog/i-created-rap-video"
    segments: string[]; // ["blog", "i-created-rap-video"]
};

type Resolver = (ctx: ResolverCtx) => Promise<PageResult>;

function pickResolver(ctx: ResolverCtx): { key: string; load: Resolver } {
    // /blog/<postId>
    if (ctx.segments[0] === "blog" && ctx.segments[1]) {
        const postId = ctx.segments.slice(1).join("/"); // supports nested if needed
        return {
            key: `post:${postId}`,
            load: () => getPageByPostId(postId),
        };
    }

    // default: treat as funnel page slug
    return {
        key: `page:${ctx.slug}`,
        load: () => getPageBySlug(ctx.slug),
    };
}
