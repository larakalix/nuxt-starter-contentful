import { pickResolver, type PageResult } from "@starter/content/utils";

export async function loadFunnelPage(path: string | undefined): Promise<{
    slug: string;
    funnelPage: PageResult;
    error: Error | null;
    resolverKey: string;
}> {
    const segments = !path ? [] : path.split("/").filter(Boolean);
    const slug = segments.length ? segments.join("/") : "home";

    const resolver = pickResolver({ slug, segments });

    try {
        const funnelPage = await resolver.load({ slug, segments });
        if (!funnelPage) throw new Error(`Page not found: ${slug}`);

        return { slug, funnelPage, error: null, resolverKey: resolver.key };
    } catch (err) {
        return {
            slug,
            funnelPage: null,
            error: err as Error,
            resolverKey: resolver.key,
        };
    }
}
