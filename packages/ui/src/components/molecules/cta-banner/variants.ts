import { tv } from "tailwind-variants";

export const ctaBannerVariants = tv({
    base: "w-full rounded-xl px-6 md:px-10 flex justify-center",
    variants: {
        tone: {
            default: "bg-muted",
            soft: "bg-muted/60",
            prominent: "bg-primary/5",
        },
        size: {
            xs: "py-2 md:py-3",
            sm: "py-8 md:py-10",
            md: "py-12 md:py-16",
            lg: "py-16 md:py-20",
        },
    },
    defaultVariants: {
        tone: "soft",
        size: "md",
    },
});

type CtaBannerTone = keyof typeof ctaBannerVariants.variants.tone;
type CtaBannerSize = keyof typeof ctaBannerVariants.variants.size;

export type CtaBannerVariantsProps = {
    tone?: CtaBannerTone;
    size?: CtaBannerSize;
    class?: string;
};
