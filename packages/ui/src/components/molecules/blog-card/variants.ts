import { tv } from "tailwind-variants";

export const blogCardVariants = tv({
    base: "group h-full",
    variants: {
        variant: {
            default: "",
            compact: "p-2 sm:p-3",
        },
        layout: {
            vertical: "flex flex-col gap-4",
            horizontal: "flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch",
            // horizontal: "grid grid-cols-3 gap-4 sm:gap-6 items-stretch",
        },
        clickable: {
            true: "cursor-pointer hover:border-primary/60",
            false: "",
        },
    },
    defaultVariants: {
        clickable: true,
    },
});

type BlogCardVariant = keyof typeof blogCardVariants.variants.variant;
type BlogCardLayout = keyof typeof blogCardVariants.variants.layout;

export type BlogCardVariantsProps = {
    variant?: BlogCardVariant;
    layout?: BlogCardLayout;
    clickable?: boolean;
    class?: string;
};
