import type { ButtonProps } from "../../atoms";
import type { SectionHeadingProps } from "../section-heading";
import type { CtaBannerVariantsProps } from "./variants";

export type CtaBannerProps = CtaBannerVariantsProps & {
    sectionHeading?: SectionHeadingProps;
    /** Small label inside pill, e.g. "Write On" */
    label?: string;
    /** Brand / title next to pill, e.g. "Notebook" */
    brandTitle?: string;
    /** Main heading text */
    title: string;
    /** Optional subtitle line under the heading */
    subtitle?: string;
    /**
     * Optional paragraphs rendered under the subtitle.
     * If you need rich markup, use the default slot instead.
     */
    paragraphs?: string[];
    buttonProps?: ButtonProps;
    class?: string;
};
