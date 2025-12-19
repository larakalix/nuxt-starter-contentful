import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { BLOG_CARD_LIST_ITEM_SECTION } from "./blog-card-list-item";

export const BLOG_CARD_LIST_SECTION = gql`
    fragment BlogCardListSection on BlogCardList {
        sys {
            ...SysFields
        }
        name
        description
        layout
        columns
        colSpan
        sectionHeading {
            __typename
            name
            title
            label
            align
            size
            colSpan
            sys {
                ...SysFields
            }
            tag {
                ...TagFields
            }
        }
        itemsCollection(limit: 10) {
            items {
                ...BlogCardListItemSection
            }
        }
    }

    ${SYS_FIELDS}
    ${BLOG_CARD_LIST_ITEM_SECTION}
`;
