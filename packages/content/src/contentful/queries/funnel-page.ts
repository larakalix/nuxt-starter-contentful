import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";
import { TAG_FIELDS } from "./fragments/tag";
import { IMAGE_FIELDS } from "./fragments/image";
import { BLOG_CARD_LIST_SECTION } from "./fragments/blog-card-list";
import { SECTION_GRID_SECTION } from "./fragments/section-grid";

// query FunnelPageBySlug($slug: String!, $limit: Int, $locale: String) {
//         funnelPageCollection(
//             where: { slug: $slug }
//             limit: $limit
//             locale: $locale
//         ) {

export const FUNNEL_PAGE_BY_SLUG = gql`
    query FunnelPageBySlug($where: FunnelPageFilter, $limit: Int) {
        funnelPageCollection(where: $where, limit: $limit) {
            items {
                __typename
                sys {
                    ...SysFields
                }
                slug
                theme
                skipWrapper
                navBar {
                    sys {
                        ...SysFields
                    }
                    __typename
                    name
                    sticky
                    showBorder
                }
                footer {
                    sys {
                        ...SysFields
                    }
                    __typename
                    name
                }
                template {
                    __typename
                    sys {
                        ...SysFields
                    }
                    name
                    sectionsCollection(limit: 10) {
                        items {
                            __typename
                            ... on BlogCardList {
                                ...BlogCardListSection
                            }
                            ... on GridSection {
                                ...SectionGridSection
                            }
                        }
                    }
                }
            }
        }
    }

    ${SYS_FIELDS}
    ${TAG_FIELDS}
    ${IMAGE_FIELDS}
    ${BLOG_CARD_LIST_SECTION}
    ${SECTION_GRID_SECTION}
`;
