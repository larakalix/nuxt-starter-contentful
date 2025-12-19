import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const NAVBAR_FIELDS = gql`
    fragment NavbarFields on Navbar {
        sys {
            ...SysFields
        }
        __typename
        name
        sticky
        showBorder
    }
    ${SYS_FIELDS}
`;
