import type { FunnelPage } from "@starter/content/types";
import { getPageBySlug } from "@starter/content";

export function parseSlugParam(slug: string | undefined) {
    const [path, id] = !slug ? ["home", ""] : slug.split("/");
    return { path, id };
}

export async function loadFunnelPage(path: string): Promise<{
    funnelPage: FunnelPage | null;
    error: Error | null;
}> {
    try {
        const funnelPage = await getPageBySlug(path);
        if (!funnelPage)
            throw new Error(`Failed to load funnel page with slug: ${path}`);

        return { funnelPage, error: null };
    } catch (err) {
        return { funnelPage: null, error: err as Error };
    }
}
