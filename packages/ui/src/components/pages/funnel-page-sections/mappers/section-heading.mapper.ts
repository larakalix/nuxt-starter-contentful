import type { BadgeProps } from "@/src/components/atoms";
import type { SectionHeadingProps } from "@/src/components/molecules";
import type { SectionHeading } from "@starter/content";

export const mapSectionHeading = (section: SectionHeading) => {
    return {
        title: section?.title ?? "",
        label: section?.label ?? "",
        colSpan: section?.colSpan as SectionHeadingProps["colSpan"],
        tag: {
            id: section?.tag?.sys.id ?? "",
            variant: section?.tag?.variant as BadgeProps["variant"],
            rounded: section?.tag?.rounded as BadgeProps["rounded"],
            weight: section?.tag?.weight as BadgeProps["weight"],
        },
    };
};
