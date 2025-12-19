import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";
import { IMAGE_FIELDS } from "./fragments/image";

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
                    sys {
                        ...SysFields
                    }
                    name
                    title
                    excerpt
                    href
                    dateLabel
                    readTimeLabel
                    layout
                    image {
                        ...ImageFields
                    }
                }
            }
        }
    }

    ${SYS_FIELDS}
    ${IMAGE_FIELDS}
`;
