import { tv } from "tailwind-variants";
import { globalStyles } from "./../../../utils/styles.utils";

export const sectionGridVariants = tv({
    base: `grid gap-2 md:gap-4 w-full ${globalStyles.contentPadding}`,
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
        tone: {
            none: "",
            default: "bg-muted",
            soft: "bg-muted/60",
            prominent: "bg-primary/5",
            full: "bg-primary",
        },
    },
    defaultVariants: {
        columns: 3,
        tone: "none",
    },
});

type SectionGridColumns = keyof typeof sectionGridVariants.variants.columns;
type CtaBannerTone = keyof typeof sectionGridVariants.variants.tone;

export type SectionGridVariantProps = {
    columns?: SectionGridColumns;
    tone?: CtaBannerTone;
};
