import type { BadgeProps } from "../../atoms";
import type { SectionHeadingVariantsProps } from "./variants";

export type SectionHeadingProps = SectionHeadingVariantsProps & {
    label: string;
    title: string;
    as?: string;
    class?: string;
    tag?: Omit<BadgeProps, "label">;
};
