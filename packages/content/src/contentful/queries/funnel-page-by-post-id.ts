import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";
import { IMAGE_FIELDS } from "./fragments/image";
import { BLOG_CARD_LIST_ITEM_SECTION } from "./fragments/blog-card-list-item";

export const FUNNEL_PAGE_BY_POST_ID = gql`
    query BlogCardByHref($where: BlogCardListItemFilter, $limit: Int = 1) {
        blogCardListItemCollection(where: $where, limit: $limit) {
            __typename
            total
            limit
            items {
                sys {
                    ...SysFields
                }
                __typename
                ... on BlogCardListItem {
                    ...BlogCardListItemSection
                }
            }
        }
    }

    ${SYS_FIELDS}
    ${IMAGE_FIELDS}
    ${BLOG_CARD_LIST_ITEM_SECTION}
`;
