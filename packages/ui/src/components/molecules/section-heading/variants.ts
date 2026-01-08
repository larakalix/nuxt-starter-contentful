import { tv } from "tailwind-variants";

export const sectionHeadingVariants = tv({
    base: "flex items-center justify-start gap-2 w-full",
    variants: {
        align: {
            left: "justify-start text-left",
            center: "justify-center text-center",
            right: "justify-end text-right",
        },
        size: {
            sm: "text-sm",
            md: "text-base md:text-md",
            lg: "text-md md:text-lg",
            xl: "text-lg md:text-xl",
            "2xl": "text-xl md:text-2xl",
            "3xl": "text-2xl md:text-3xl",
            "4xl": "text-3xl md:text-4xl",
            "5xl": "text-4xl md:text-5xl",
        },
        colSpan: {
            0: "",
            1: "col-span-1",
            2: "col-span-1 md:col-span-2",
            3: "col-span-1 md:col-span-3",
            4: "col-span-1 md:col-span-4",
            5: "col-span-1 md:col-span-5",
            6: "col-span-1 md:col-span-6",
            7: "col-span-1 md:col-span-7",
            8: "col-span-1 md:col-span-8",
        },
        density: {
            none: "p-0",
            default: "px-2 md:px-6",
        },
    },
    defaultVariants: {
        align: "left",
        size: "md",
        colSpan: 0,
        density: "default",
    },
});

type SectionHeadingAlign = keyof typeof sectionHeadingVariants.variants.align;
type SectionHeadingSize = keyof typeof sectionHeadingVariants.variants.size;
type SectionHeadingColSpan = keyof typeof sectionHeadingVariants.variants.colSpan;
type SectionHeadingDensity = keyof typeof sectionHeadingVariants.variants.density;

export type SectionHeadingVariantsProps = {
    align?: SectionHeadingAlign;
    size?: SectionHeadingSize;
    colSpan?: SectionHeadingColSpan;
    density?: SectionHeadingDensity;
    class?: string;
};
