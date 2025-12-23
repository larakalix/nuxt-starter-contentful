import { PAGE_SLUGS } from "../../queries/page-slugs";
import { getEntries } from "../entries";

export async function getPagesSlugs(
    preview = false,
    locale: string = "en-US"
): Promise<{ id: string; slug: string }[]> {
    const { items } = await getEntries<
        { sys: { id: string }; slug: string },
        "funnelPageCollection"
    >(
        PAGE_SLUGS,
        {
            collectionKey: "funnelPageCollection",
            locale,
            limit: 30,
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
        slug: item.slug,
    }));
}
