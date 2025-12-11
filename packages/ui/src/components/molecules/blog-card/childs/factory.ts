import BlogCardHorizontal from "./blog-card-horizontal.vue";
import BlogCardVertical from "./blog-card-vertical.vue";

export const BLOG_CARD_LAYOUTS = {
    vertical: BlogCardVertical,
    horizontal: BlogCardHorizontal,
} as const;

export type BlogCardLayout = keyof typeof BLOG_CARD_LAYOUTS;

export function resolveBlogCardLayout(layout: BlogCardLayout) {
    return BLOG_CARD_LAYOUTS[layout] ?? BLOG_CARD_LAYOUTS["vertical"];
}
