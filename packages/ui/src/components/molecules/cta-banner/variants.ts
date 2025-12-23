import { tv } from "tailwind-variants";

export const ctaBannerVariants = tv({
    base: "w-full flex",
    variants: {
        tone: {
            default: "bg-muted",
            soft: "bg-muted/60",
            prominent: "bg-primary/5",
            full: "bg-primary",
        },
        size: {
            xs: "p-2 md:p-3 lg:p-4",
            sm: "p-6 md:p-10 lg:p-12",
            md: "p-10 md:p-12 lg:p-16",
            lg: "p-12 md:p-16 lg:p-20",
            xl: "p-16 md:p-20 lg:p-24",
        },
        rounded: {
            none: "rounded-none",
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        align: {
            center: "justify-center",
            start: "justify-start",
            end: "justify-end",
        },
        paragraphAlign: {
            center: "text-center",
            left: "text-left",
            right: "text-right",
        },
    },
    defaultVariants: {
        tone: "soft",
        size: "md",
        rounded: "xl",
        align: "center",
        paragraphAlign: "center",
    },
});

type CtaBannerTone = keyof typeof ctaBannerVariants.variants.tone;
type CtaBannerSize = keyof typeof ctaBannerVariants.variants.size;
type CtaBannerRounded = keyof typeof ctaBannerVariants.variants.rounded;
type CtaBannerAlign = keyof typeof ctaBannerVariants.variants.align;
type CtaBannerParagraphAlign =
    keyof typeof ctaBannerVariants.variants.paragraphAlign;

export type CtaBannerVariantsProps = {
    tone?: CtaBannerTone;
    size?: CtaBannerSize;
    rounded?: CtaBannerRounded;
    align?: CtaBannerAlign;
    paragraphAlign?: CtaBannerParagraphAlign;
    class?: string;
};
