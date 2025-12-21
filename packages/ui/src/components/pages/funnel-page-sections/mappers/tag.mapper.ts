import type { BadgeProps } from "@/src/components/atoms";
import type { SectionTag } from "@starter/content";

export const mapTag = (section: SectionTag | undefined): BadgeProps => {
    return {
        id: section?.sys.id ?? "",
        label: section?.label ?? "",
        variant: section?.variant as BadgeProps["variant"],
        rounded: section?.rounded as BadgeProps["rounded"],
        weight: section?.weight as BadgeProps["weight"],
        color: section?.color as BadgeProps["color"],
    };
};
