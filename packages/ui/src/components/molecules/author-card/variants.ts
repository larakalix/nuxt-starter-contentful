import { tv } from "tailwind-variants";

export const authorCardVariants = tv({
    base: "flex items-center gap-4",

    variants: {
        clickable: {
            true: "cursor-pointer",
            false: "",
        },
        align: {
            left: "",
            center: "justify-center text-center",
        },
    },

    defaultVariants: {
        clickable: false,
        align: "left",
    },
});

type AuthorCardAlign = keyof typeof authorCardVariants.variants.align;

export type AuthorCardVariantsProps = {
    clickable?: boolean;
    align?: AuthorCardAlign;
    class?: string;
};
