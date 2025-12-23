import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./fragments/sys";

export const PAGE_SLUGS = gql`
    query GetPageSlugs($limit: Int = 30, $skip: Int = 0) {
        funnelPageCollection(limit: $limit, skip: $skip) {
            total
            items {
                sys {
                    ...SysFields
                }
                slug
            }
        }
    }

    ${SYS_FIELDS}
`;
