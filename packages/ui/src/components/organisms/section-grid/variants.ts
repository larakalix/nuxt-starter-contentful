import { tv } from "tailwind-variants";

export const sectionGridVariants = tv({
    base: "grid gap-2 md:gap-4 w-full",
    variants: {
        columns: {
            1: "grid-cols-1",
            2: "grid-cols-1 md:grid-cols-2",
            3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
            4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
            5: "grid-cols-1 md:grid-cols-2 xl:grid-cols-5",
            6: "grid-cols-1 md:grid-cols-2 xl:grid-cols-6",
            7: "grid-cols-1 md:grid-cols-2 xl:grid-cols-7",
            8: "grid-cols-1 md:grid-cols-2 xl:grid-cols-8",
        },
    },
    defaultVariants: {},
});

type SectionGridColumns = keyof typeof sectionGridVariants.variants.columns;

export type SectionGridVariantProps = {
    columns?: SectionGridColumns;
};
