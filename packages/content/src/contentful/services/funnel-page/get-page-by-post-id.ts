import type { FunnelPage } from "../../../types";
import { FUNNEL_PAGE_BY_SLUG } from "../../queries/funnel-page";
import { getBySlug } from "./../entries";

export async function getPageByPostId(
    postId: string,
    preview = false,
    locale: string = "en-US"
): Promise<FunnelPage | null> {
    const page = await getBySlug<FunnelPage, "funnelPageCollection">(
        FUNNEL_PAGE_BY_SLUG,
        {
            collectionKey: "funnelPageCollection",
            slug: postId,
            locale,
            slugField: "postId", // specify postId field
            // limit: 1, // default is 1
        },
        {
            preview,
            errorMessage: `Failed to fetch page with postId: ${postId}`,
            fetchPolicy: "no-cache",
            // fetchPolicy: preview ? "no-cache" : undefined, // optional override
        }
    );

    return page;
}
