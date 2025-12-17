import { gql } from "@apollo/client";

export const SYS_FIELDS = gql`
    fragment SysFields on Sys {
        id
    }
`;
