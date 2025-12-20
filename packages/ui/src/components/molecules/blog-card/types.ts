import type { BadgeProps, OnNavigate } from "../../atoms";
import type { BlogCardVariantsProps } from "./variants";

export type BlogCardProps = BlogCardVariantsProps & {
    id?: string;
    tag?: BadgeProps;
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    authorName: string;
    authorAvatarSrc?: string;
    dateLabel: string;
    readTimeLabel?: string;
    excerpt?: string;
    href?: string;
    class?: string;
    bodyContent?: string;
    onNavigate?: OnNavigate;
};
