import { tv } from "tailwind-variants";

export const blogCardVariants = tv({
    base: "group p-2 md:p-6 h-full",
    variants: {
        variant: {
            default: "",
            compact: "p-2 sm:p-3",
        },
        background: {
            transparent: "bg-transparent",
            light: "bg-white",
            dark: "bg-gray-900",
        },
        layout: {
            vertical: "flex flex-col gap-4",
            horizontal:
                "flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch",
        },
        clickable: {
            true: "cursor-pointer hover:border-primary/60",
            false: "",
        },
    },
    defaultVariants: {
        clickable: true,
        variant: "default",
        layout: "vertical",
        background: "light",
    },
});

type BlogCardVariant = keyof typeof blogCardVariants.variants.variant;
type BlogCardLayout = keyof typeof blogCardVariants.variants.layout;
type BlogCardBackground = keyof typeof blogCardVariants.variants.background;

export type BlogCardVariantsProps = {
    variant?: BlogCardVariant;
    layout?: BlogCardLayout;
    background?: BlogCardBackground;
    clickable?: boolean;
    class?: string;
};
