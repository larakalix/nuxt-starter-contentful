import { tv } from "tailwind-variants";

export const navbarVariants = tv({
    base: "w-full z-40 bg-background text-foreground",

    variants: {
        variant: {
            solid: "bg-background",
            transparent: "bg-transparent",
            blur: "bg-background/80 backdrop-blur",
        },
        sticky: {
            true: "sticky top-0",
            false: "",
        },
        showBorder: {
            true: "border-b border-border",
            false: "",
        },
    },
    defaultVariants: {
        variant: "solid",
        sticky: true,
        showBorder: true,
    },
});

type NavbarVariant = keyof typeof navbarVariants.variants.variant;

export type NavbarVariantsProps = {
    variant?: NavbarVariant;
    sticky?: boolean;
    showBorder?: boolean;
};
