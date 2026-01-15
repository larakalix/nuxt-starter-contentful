import type { SectionType } from "@starter/content/section-types";
import type { BlogCardListProps } from "../blog-card-list";
import type { SectionGridVariantProps } from "./variants";
import type { OnNavigate } from "../../atoms/versatile-link/types";

export type SectionGrid = BlogCardListProps;

export type SectionGridProps = SectionGridVariantProps & {
    items: SectionType[];
    class?: string;
    onNavigate?: OnNavigate;
};
