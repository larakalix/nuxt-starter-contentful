import type { FunnelPage } from "../../../types/landing";
import { FUNNEL_PAGE_BY_SLUG } from "../../queries/funnel-page";
import { getBySlug } from "../entries";

export async function getPageBySlug(
    slug: string,
    preview = false,
    locale: string = "en-US"
): Promise<FunnelPage | null> {
    const page = await getBySlug<FunnelPage, "funnelPageCollection">(
        FUNNEL_PAGE_BY_SLUG,
        {
            collectionKey: "funnelPageCollection",
            slug,
            locale,
            // slugField: "slug", // optional
            // limit: 1, // default is 1
        },
        {
            preview,
            errorMessage: `Failed to fetch page with slug: ${slug}`,
            fetchPolicy: "no-cache",
            // fetchPolicy: preview ? "no-cache" : undefined, // optional override
        }
    );

    return page;
}
