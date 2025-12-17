import { tv } from "tailwind-variants";

export const sectionHeadingVariants = tv({
    base: "flex items-start justify-start gap-2 px-2 md:px-6",
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
        colSpan: {
            1: "col-span-1",
            2: "col-span-2",
            3: "col-span-3",
            4: "col-span-4",
            5: "col-span-5",
            6: "col-span-6",
            7: "col-span-7",
            8: "col-span-8",
        },
    },
    defaultVariants: {
        align: "left",
        size: "md",
    },
});

type SectionHeadingAlign = keyof typeof sectionHeadingVariants.variants.align;
type SectionHeadingSize = keyof typeof sectionHeadingVariants.variants.size;
type SectionHeadingColSpan =
    keyof typeof sectionHeadingVariants.variants.colSpan;

export type SectionHeadingVariantsProps = {
    align?: SectionHeadingAlign;
    size?: SectionHeadingSize;
    colSpan?: SectionHeadingColSpan;
    class?: string;
};
