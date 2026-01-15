import type {
    FunnelGenericPage,
    FunnelPage,
    SectionFormFields,
} from "../../../types";
import { getMockedContentfulData } from "../../mock";
import { FUNNEL_PAGE_BY_SLUG } from "../../queries/funnel-page";
import { getBySlug } from "../entries";

export async function getPageBySlug(
    slug: string,
    preview = false,
    locale: string = "en-US",
    fetchMock: boolean = false
): Promise<FunnelGenericPage | null> {
    if (fetchMock) return getMockedContentfulData(slug);

    const [page] = await Promise.all([
        getBySlug<FunnelPage, "funnelPageCollection">(
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
        ),
    ]);

    return { page };
}
