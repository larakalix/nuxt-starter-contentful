import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { TAG_FIELDS } from "./tag";
import { IMAGE_FIELDS } from "./image";

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
                tag {
                    ...TagFields
                }
                image {
                    ...ImageFields
                }
            }
        }
    }

    ${SYS_FIELDS}
    ${TAG_FIELDS}
    ${IMAGE_FIELDS}
`;
