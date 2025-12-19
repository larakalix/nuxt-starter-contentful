import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";

export const BLOG_CARD_ITEM_IDS = gql`
    query GetAllIds($limit: Int = 1000, $skip: Int = 0) {
        blogCardListItemCollection(limit: $limit, skip: $skip) {
            total
            items {
                sys {
                    ...SysFields
                }
                href
            }
        }
    }

    ${SYS_FIELDS}
`;
