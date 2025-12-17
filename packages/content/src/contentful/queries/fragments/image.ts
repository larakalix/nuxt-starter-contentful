import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const IMAGE_FIELDS = gql`
    fragment ImageFields on Asset {
        __typename
        sys {
            ...SysFields
        }
        url
        title
        description
    }
    ${SYS_FIELDS}
`;
