import type { BadgeProps } from "../../atoms/badge/types";
import type { OnNavigate } from "../../atoms/versatile-link/types";
import type { AuthorCardProps } from "../author-card";
import type { BlogCardVariantsProps } from "./variants";

export type BlogCardProps = BlogCardVariantsProps & {
    id?: string;
    tag?: BadgeProps;
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    authors: AuthorCardProps[];
    dateLabel: string;
    readTimeLabel?: string;
    excerpt?: string;
    href?: string;
    class?: string;
    bodyContent?: string;
    showTocMenu?: boolean;
    onNavigate?: OnNavigate;
};
