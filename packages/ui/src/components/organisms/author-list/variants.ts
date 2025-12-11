import { tv } from "tailwind-variants";

export const authorListVariants = tv({
    base: "grid",
    variants: {
        columns: {
            1: "grid-cols-1 gap-6",
            2: "grid-cols-1 md:grid-cols-2 gap-8",
            3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",
            4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8",
            5: "grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8",
            6: "grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8",
        },
    },
    defaultVariants: {
        columns: 1,
    },
});

export type AuthorListVariantsProps = {
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
};
