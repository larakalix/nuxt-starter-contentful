import { tv } from "tailwind-variants";

export const blogCardListVariants = tv({
    base: "w-full h-fit",
    variants: {
        layout: {
            grid: "grid items-stretch auto-rows-auto",
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
        colSpan: {
            1: "col-span-1",
            2: "col-span-1 md:col-span-2",
            3: "col-span-1 md:col-span-3",
            4: "col-span-1 md:col-span-4",
            5: "col-span-1 md:col-span-5",
            6: "col-span-1 md:col-span-6",
            7: "col-span-1 md:col-span-7",
            8: "col-span-1 md:col-span-8",
        },
    },
    defaultVariants: {
        layout: "grid",
        columns: 3,
    },
});

type BlogCardListLayout = keyof typeof blogCardListVariants.variants.layout;
type BlogCardListColSpan = keyof typeof blogCardListVariants.variants.colSpan;

export type BlogCardListVariantsProps = {
    layout?: BlogCardListLayout;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    colSpan?: BlogCardListColSpan;
};
