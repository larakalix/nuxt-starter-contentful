import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const TAG_FIELDS = gql`
    fragment TagFields on Tag {
        __typename
        sys {
            ...SysFields
        }
        label
        variant
        color
        rounded
    }
    ${SYS_FIELDS}
`;
