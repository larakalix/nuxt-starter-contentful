import type { BlogCardProps } from "../../molecules";
import type { BlogCardListVariantsProps } from "./variants";

export type BlogCardListItem = BlogCardProps & {
    id?: string;
};

export type BlogCardListProps = BlogCardListVariantsProps & {
    items: BlogCardListItem[];
    class?: string;
};
