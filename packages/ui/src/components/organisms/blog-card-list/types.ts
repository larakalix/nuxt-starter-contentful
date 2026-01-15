import type { OnNavigate } from "../../atoms/versatile-link/types";
import type { SectionHeadingProps } from "../../molecules/section-heading/types";
import type { BlogCardProps } from "../../molecules/blog-card/types";
import type { BlogCardListVariantsProps } from "./variants";

export type BlogCardListItem = BlogCardProps & {
    id?: string;
};

export type BlogCardListProps = BlogCardListVariantsProps & {
    sectionHeading?: SectionHeadingProps;
    items: BlogCardListItem[];
    class?: string;
    onNavigate?: OnNavigate;
};
