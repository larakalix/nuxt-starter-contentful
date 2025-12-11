import { tv } from "tailwind-variants";

export const footerVariants = tv({
    base: "w-full bg-background text-foreground",

    variants: {
        variant: {
            solid: "bg-background",
            transparent: "bg-transparent",
            blur: "bg-background/80 backdrop-blur",
            secondary: "bg-secondary text-secondary-foreground",
        },
    },
    defaultVariants: {
        variant: "secondary",
    },
});

type FooterVariant = keyof typeof footerVariants.variants.variant;

export type FooterVariantsProps = {
    variant?: FooterVariant;
    class?: string;
};
