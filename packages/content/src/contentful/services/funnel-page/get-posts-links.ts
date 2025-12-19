import { BLOG_CARD_ITEM_IDS } from "../../queries/blog-card-item-ids";
import { getEntries } from "../entries";

export async function getPostsLinks(
    preview = false,
    locale: string = "en-US"
): Promise<{ id: string; href: string }[]> {
    const { items } = await getEntries<
        { sys: { id: string }; href: string },
        "blogCardListItemCollection"
    >(
        BLOG_CARD_ITEM_IDS,
        {
            collectionKey: "blogCardListItemCollection",
            locale,
            limit: 1000,
            skip: 0,
        },
        {
            preview,
            errorMessage: `Failed to fetch blog post IDs`,
            fetchPolicy: "no-cache",
        }
    );

    return items.map((item) => ({
        id: item.sys.id,
        href: item.href,
    }));
}
