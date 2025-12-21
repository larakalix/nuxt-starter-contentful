import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { TAG_FIELDS } from "./tag";
import { IMAGE_FIELDS } from "./image";

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
        tag {
            ...TagFields
        }
        image {
            ...ImageFields
        }
    }

    ${SYS_FIELDS}
    ${TAG_FIELDS}
    ${IMAGE_FIELDS}
`;
