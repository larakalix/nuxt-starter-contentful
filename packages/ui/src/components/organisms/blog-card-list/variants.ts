import { tv } from "tailwind-variants";

export const blogCardListVariants = tv({
    base: "w-full",
    variants: {
        layout: {
            grid: "grid items-stretch auto-rows-fr",
            stacked: "flex flex-col",
        },
        columns: {
            1: "grid-cols-1 gap-6",
            2: "grid-cols-1 md:grid-cols-2 gap-8",
            3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
            5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8",
            6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8",
        },
    },
    defaultVariants: {
        layout: "grid",
        columns: 3,
    },
});

type BlogCardListLayout = keyof typeof blogCardListVariants.variants.layout;

export type BlogCardListVariantsProps = {
    layout?: BlogCardListLayout;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
};
