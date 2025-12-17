import { gql } from "@apollo/client";
import { BLOG_CARD_LIST_SECTION } from "./blog-card-list";
import { SECTION_GRID_SECTION } from "./section-grid";

export const TEMPLATE_SECTIONS = gql`
    fragment TemplateSections on Template {
        sectionsCollection(limit: 20) {
            items {
                __typename
                ...BlogCardListSection
            }
        }
    }

    ${BLOG_CARD_LIST_SECTION}
    ${SECTION_GRID_SECTION}
`;
