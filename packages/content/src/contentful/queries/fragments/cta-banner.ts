import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";

export const CTA_BANNER_SECTION = gql`
    fragment CtaBannerSection on CtaBanner {
        sys {
            ...SysFields
        }
        title
        subtitle
        label
        paragraphs
        class
    }

    ${SYS_FIELDS}
`;
