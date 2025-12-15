import { gql } from "@apollo/client";

export const FUNNEL_PAGE_BY_SLUG = gql`
    query FunnelPageBySlug($slug: String!) {
        funnelPageCollection(where: { slug: $slug }, limit: 1) {
            items {
                __typename
                sys {
                    id
                }
                slug
                theme
                skipWrapper
                navBar {
                    sys {
                        id
                    }
                    __typename
                    name
                    sticky
                    showBorder
                }
                footer {
                    sys {
                        id
                    }
                    __typename
                    name
                }
                template {
                    __typename
                    sys {
                        id
                    }
                    name
                    sectionsCollection(limit: 20) {
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
                                }
                                itemsCollection(limit: 50) {
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
                                            __typename
                                            sys {
                                                id
                                            }
                                            url
                                            title
                                            description
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
