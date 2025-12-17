import type { SectionType } from "@starter/content";
import type { BlogCardListProps } from "../blog-card-list";
import type { SectionGridVariantProps } from "./variants";
import type { OnNavigate } from "../../atoms";

export type SectionGrid = BlogCardListProps;

export type SectionGridProps = SectionGridVariantProps & {
    items: SectionType[];
    class?: string;
    onNavigate?: OnNavigate;
};
