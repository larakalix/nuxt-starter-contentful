import { tv } from "tailwind-variants";

export const authorBadgeVariants = tv({
    base: "relative flex items-center",
    variants: {
        variant: {
            single: "",
            multiple: "",
        },
    },
    defaultVariants: {},
});

type AuthorBadgeVariant = keyof typeof authorBadgeVariants.variants.variant;

export type AuthorBadgeVariantProps = {
    variant?: AuthorBadgeVariant;
};
