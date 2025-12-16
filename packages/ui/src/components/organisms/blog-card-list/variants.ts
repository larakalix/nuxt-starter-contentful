import { tv } from "tailwind-variants";

export const blogCardListVariants = tv({
    base: "w-full",
    variants: {
        layout: {
            grid: "grid items-stretch auto-rows-fr",
            stacked: "flex flex-col",
        },
        columns: {
            1: "grid-cols-1 gap-4",
            2: "grid-cols-1 md:grid-cols-2 gap-2 md:gap-4",
            3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4",
            4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4",
            5: "grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2 md:gap-4",
            6: "grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-2 md:gap-4",
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
