import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { TAG_FIELDS } from "./tag";

export const SECTION_HEADING_FIELDS = gql`
    fragment SectionHeadingFields on SectionHeadingComponent {
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
    ${SYS_FIELDS}
    ${TAG_FIELDS}
`;
