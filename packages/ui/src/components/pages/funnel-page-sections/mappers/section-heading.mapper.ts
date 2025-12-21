import type { SectionHeadingProps } from "@/src/components/molecules";
import type { SectionHeading } from "@starter/content";
import { mapTag } from "./tag.mapper";

export const mapSectionHeading = (
    section: SectionHeading
): SectionHeadingProps => {
    return {
        title: section?.title ?? "",
        label: section?.label ?? "",
        colSpan: section?.colSpan as SectionHeadingProps["colSpan"],
        tag: mapTag(section?.tag),
    };
};
