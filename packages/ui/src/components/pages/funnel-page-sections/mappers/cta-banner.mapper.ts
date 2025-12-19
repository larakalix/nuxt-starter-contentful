import type { CtaBannerProps } from "@/src/components/molecules";
import type { SectionCtaBanner } from "@starter/content";
import { mapSectionHeading } from "./section-heading.mapper";

export const mapCtaBannerProps = (
    section: SectionCtaBanner
): CtaBannerProps => {
    return {
        ...section,
        title: section.title || "",
        subtitle: section.subtitle || "",
        label: section.label || "",
        sectionHeading:
            section.sectionHeading && mapSectionHeading(section.sectionHeading),
        paragraphs: section.paragraphs?.split("\n") || [],
        class: section.class,
    };
};
