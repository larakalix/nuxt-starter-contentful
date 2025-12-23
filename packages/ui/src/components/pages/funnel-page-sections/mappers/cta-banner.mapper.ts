import type { CtaBannerProps } from "@/src/components/molecules";
import type { SectionCtaBanner } from "@starter/content";
import { mapSectionHeading } from "./section-heading.mapper";

export const mapCtaBannerProps = (
    section: SectionCtaBanner
): CtaBannerProps => {
    return {
        id: section.sys.id,
        title: section.title || "",
        subtitle: section.subtitle || "",
        label: section.label || "",
        tone: (section.tone as CtaBannerProps["tone"]) || "prominent",
        size: (section.size as CtaBannerProps["size"]) || "md",
        sectionHeading:
            section.sectionHeading && mapSectionHeading(section.sectionHeading),
        paragraphs: section.paragraphs?.split("\n").map((p) => p.trim()) || [],
        class: section.class,
    };
};
