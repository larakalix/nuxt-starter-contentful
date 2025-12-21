import { gql } from "@apollo/client";
import { SYS_FIELDS } from "./sys";
import { IMAGE_FIELDS } from "./image";
import { TAG_FIELDS } from "./tag";

export const SECTION_GRID_SECTION = gql`
    fragment SectionGridSection on GridSection {
        __typename
        sys {
            ...SysFields
        }
        name
        columns
        tone
        sectionHeading {
            __typename
            name
            title
            label
            align
            size
            colSpan
            sys {
                ...SysFields
            }
            tag {
                ...TagFields
            }
        }
        sectionsCollection(limit: 10) {
            __typename
            ... on GridSectionSectionsCollection {
                __typename
                items {
                    __typename
                    ... on BlogCardList {
                        sys {
                            id
                        }
                        name
                        description
                        layout
                        columns
                        colSpan
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
                        itemsCollection(limit: 10) {
                            items {
                                __typename
                                sys {
                                    id
                                }
                                name
                                title
                                excerpt
                                href
                                dateLabel
                                readTimeLabel
                                layout
                                tag {
                                    __typename
                                    sys {
                                        id
                                    }
                                    label
                                    variant
                                    color
                                    rounded
                                }
                                image {
                                    ...ImageFields
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    ${SYS_FIELDS}
    ${IMAGE_FIELDS}
    ${TAG_FIELDS}
`;
