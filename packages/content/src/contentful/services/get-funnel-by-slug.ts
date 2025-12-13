import type { FunnelPage } from "../../types/landing";
import { FUNNEL_PAGE_BY_SLUG } from "../queries/funnel-page";
import { getFirstEntry } from "../server/server";

export async function getPageBySlug(
    slug: string,
    preview = false,
    locale: string = "en-US"
): Promise<FunnelPage | null> {
    const page = await getFirstEntry<FunnelPage>(
        FUNNEL_PAGE_BY_SLUG,
        { slug, preview, locale },
        "funnelPageCollection",
        preview,
        `Failed to fetch page with slug: ${slug}`
    );

    return page;
}
