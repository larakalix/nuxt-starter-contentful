import {
    type FunnelGenericPage,
    type FunnelPage,
    type SectionType,
} from "../../../types";
import { FUNNEL_PAGE_BY_SLUG } from "../../queries/funnel-page";
import { FUNNEL_PAGE_BY_POST_ID } from "../../queries/funnel-page-by-post-id";
import { getBySlug, getEntries } from "./../entries";

export async function getPageByPostId(
    slug: string,
    postId: string,
    preview = false,
    locale: string = "en-US"
): Promise<FunnelGenericPage | null> {
    const [page, postPage] = await Promise.all([
        getBySlug<FunnelPage, "funnelPageCollection">(
            FUNNEL_PAGE_BY_SLUG,
            {
                collectionKey: "funnelPageCollection",
                slug,
                locale,
            },
            {
                preview,
                errorMessage: `Failed to fetch page with slug: ${slug}`,
                fetchPolicy: "no-cache",
            }
        ),
        getEntries<SectionType, "blogCardListItemCollection">(
            FUNNEL_PAGE_BY_POST_ID,
            {
                collectionKey: "blogCardListItemCollection",
                where: { href: `/${slug}/${postId}` },
                locale,
                limit: 1,
            },
            {
                preview,
                errorMessage: `Failed to fetch page with postId: ${slug}/${postId}`,
                fetchPolicy: "no-cache",
            }
        ),
    ]);

    const item = postPage.items[0] as SectionType | undefined;

    return {
        page: {
            ...page,
            template: {
                sectionsCollection: {
                    items: item ? [item] : [],
                },
            },
        } as FunnelPage,
    };
}
