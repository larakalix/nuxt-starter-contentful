import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { TAG_FIELDS } from "./tag";
import { IMAGE_FIELDS } from "./image";
import { AUTHOR_FIELDS } from "./author";

export const BLOG_CARD_LIST_ITEM_SECTION = gql`
    fragment BlogCardListItemSection on BlogCardListItem {
        __typename
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
        showTocMenu
        bodyContent {
            json
        }
        tag {
            ...TagFields
        }
        image {
            ...ImageFields
        }
        authorsCollection(limit: 3) {
            items {
                ...AuthorFields
            }
        }
    }

    ${SYS_FIELDS}
    ${TAG_FIELDS}
    ${IMAGE_FIELDS}
    ${AUTHOR_FIELDS}
`;
