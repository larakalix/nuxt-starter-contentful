import type { AuthorCardProps, SectionHeadingProps } from "../../molecules";
import type { AuthorListVariantsProps } from "./variants";

export type AuthorListItem = AuthorCardProps & {
    id?: string;
};

export type AuthorListProps = AuthorListVariantsProps & {
    sectionHeading?: SectionHeadingProps;
    /**
     * Authors to render in the list.
     */
    items: AuthorListItem[];
    class?: string;
};
