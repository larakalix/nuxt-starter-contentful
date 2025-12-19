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
        tone
        class
        sectionHeading {
            __typename
            sys {
                id
            }
            name
            title
            label
            align
            size
            colSpan
        }
    }

    ${SYS_FIELDS}
`;
