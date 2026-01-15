import type { SectionGridProps } from "@/src/components/organisms";

import { type SectionGrid as CtSectionGrid } from "@starter/content/section-types";

export const mapSectionGridProps = (
    section: CtSectionGrid
): SectionGridProps => {
    return {
        class: section.class,
        columns: section.columns as SectionGridProps["columns"],
        tone: section.tone as SectionGridProps["tone"],
        items: section.sectionsCollection.items,
    };
};
