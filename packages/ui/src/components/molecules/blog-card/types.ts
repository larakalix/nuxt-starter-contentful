import type { BadgeProps } from "../../atoms";
import type { BlogCardVariantsProps } from "./variants";

export type BlogCardProps = BlogCardVariantsProps & {
    id?: string;
    tag?: BadgeProps;
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    authorName: string;
    authorAvatarSrc?: string;
    /**
     * Preformatted date label, e.g. "02 December 2022"
     */
    dateLabel: string;
    /**
     * Preformatted reading time, e.g. "3 Min. To Read"
     */
    readTimeLabel?: string;
    excerpt?: string;
    href?: string;
    class?: string;
};
