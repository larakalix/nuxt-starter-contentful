import { tv } from "tailwind-variants";

export const sectionHeadingVariants = tv({
    base: "flex items-center gap-2",
    variants: {
        align: {
            left: "justify-start text-left",
            center: "justify-center text-center",
            right: "justify-end text-right",
        },
        size: {
            sm: "text-sm",
            md: "text-base md:text-lg",
            lg: "text-lg md:text-2xl",
        },
    },

    defaultVariants: {
        align: "left",
        size: "md",
    },
});

type SectionHeadingAlign = keyof typeof sectionHeadingVariants.variants.align;
type SectionHeadingSize = keyof typeof sectionHeadingVariants.variants.size;

export type SectionHeadingVariantsProps = {
    align?: SectionHeadingAlign;
    size?: SectionHeadingSize;
    class?: string;
};
