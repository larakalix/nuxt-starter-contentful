import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const AUTHOR_FIELDS = gql`
    fragment AuthorFields on Author {
        sys {
            ...SysFields
        }
        name
        bio
        avatar {
            url
            title
            description
        }
    }

    ${SYS_FIELDS}
`;
