import type { BadgeProps, OnNavigate } from "../../atoms";
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
