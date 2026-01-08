import type { BadgeProps } from "../../atoms";
import type { SectionHeadingVariantsProps } from "./variants";

export type SectionHeadingProps = SectionHeadingVariantsProps & {
    label?: string;
    title: string;
    as?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
    class?: string;
    tag?: Omit<BadgeProps, "label">;
};
