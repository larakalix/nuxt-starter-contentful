import type { ButtonProps, OnNavigate } from "../../atoms";
import type { SectionHeadingProps } from "../section-heading";
import type { CtaBannerVariantsProps } from "./variants";

export type CtaBannerProps = CtaBannerVariantsProps & {
    id?: string;
    sectionHeading?: SectionHeadingProps;
    label?: string;
    brandTitle?: string;
    title: string;
    subtitle?: string;
    paragraphs?: string[];
    buttonProps?: ButtonProps;
    class?: string;
    onNavigate?: OnNavigate;
};
