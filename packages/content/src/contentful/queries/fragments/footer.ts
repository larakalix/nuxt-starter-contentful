import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const FOOTER_FIELDS = gql`
    fragment FooterFields on Footer {
        __typename
        sys {
            ...SysFields
        }
        name
    }
    ${SYS_FIELDS}
`;
