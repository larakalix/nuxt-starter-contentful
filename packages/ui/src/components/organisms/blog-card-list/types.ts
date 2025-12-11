import type { BlogCardProps, SectionHeadingProps } from "../../molecules";
import type { BlogCardListVariantsProps } from "./variants";

export type BlogCardListItem = BlogCardProps & {
    id?: string;
};

export type BlogCardListProps = BlogCardListVariantsProps & {
    sectionHeading?: SectionHeadingProps;
    items: BlogCardListItem[];
    class?: string;
};
