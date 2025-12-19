import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";
import { TAG_FIELDS } from "./fragments/tag";
import { IMAGE_FIELDS } from "./fragments/image";
import { BLOG_CARD_LIST_SECTION } from "./fragments/blog-card-list";
import { SECTION_GRID_SECTION } from "./fragments/section-grid";
import { CTA_BANNER_SECTION } from "./fragments/cta-banner";
import { NAVBAR_FIELDS } from "./fragments/navbar";

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
                showBackButton
                skipWrapper
                navBar {
                    ...NavbarFields
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
                            ... on CtaBanner {
                                ...CtaBannerSection
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
    ${CTA_BANNER_SECTION}
    ${NAVBAR_FIELDS}
`;
