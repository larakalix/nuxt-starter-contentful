import { tv } from "tailwind-variants";

export const heroBannerVariants = tv({
    slots: {
        root: "relative w-full overflow-hidden max-w-screen",
        container: "mx-auto px-4 sm:px-10 lg:px-12 xl:px-16",
        grid: "",
        content: "gap-y-4",
        media: "",
        overlay: "",
        description: "",
    },
    variants: {
        layout: {
            centered: {
                root: "bg-gray-50 py-24",
                grid: "flex flex-col items-center text-center",
                content: "max-w-screen flex flex-col",
                media: "mt-12",
                overlay: undefined,
                description: "text-center",
            },
            split: {
                root: "bg-gray-50",
                grid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                content: "max-w-screen flex flex-col",
                media: "flex justify-center",
                overlay: undefined,
                description: undefined,
            },
            background: {
                root: "min-h-[90vh] flex items-center text-white",
                grid: "relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch",
                content: "max-w-screen flex flex-col",
                media: undefined,
                overlay: "absolute inset-0 bg-black/40",
                description: undefined,
            },
            solid: {
                root: "pt-8 pb-0!",
                grid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch",
                content:
                    "max-w-screen flex flex-col justify-center py-10 lg:py-20",
                media: "relative flex items-end justify-end",
                description: undefined,
            },
        },
        rounded: {
            none: { root: "rounded-none" },
            xs: { root: "rounded-xs" },
            sm: { root: "rounded-sm" },
            md: { root: "rounded-md" },
            lg: { root: "rounded-lg" },
            xl: { root: "rounded-xl" },
            full: { root: "rounded-full" },
        },
        density: {
            tiny: { root: "py-4 lg:py-6" },
            compact: { root: "py-8 lg:py-12" },
            normal: { root: "py-16 lg:py-24" },
            spacious: { root: "py-24 lg:py-32" },
        },
        align: {
            left: { content: "items-start text-left" },
            center: { content: "items-center text-center" },
            right: { content: "items-end text-right" },
        },
        background: {
            transparent: { root: "bg-transparent" },
            primary: { root: "bg-primary text-white" },
            secondary: { root: "bg-secondary text-white" },
            muted: { root: "bg-muted text-foreground" },
        },
        columns: {
            0: { grid: "" },
            1: { grid: "grid-cols-1" },
            2: { grid: "grid-cols-1 md:grid-cols-2" },
            3: { grid: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" },
        },
    },

    defaultVariants: {
        layout: "centered",
        rounded: "xl",
        density: "normal",
        align: "left",
        background: "transparent",
        columns: 0,
    },
});

type HeroLayout = keyof typeof heroBannerVariants.variants.layout;
type HeroRounded = keyof typeof heroBannerVariants.variants.rounded;
type HeroDensity = keyof typeof heroBannerVariants.variants.density;
type HeroAlign = keyof typeof heroBannerVariants.variants.align;
type HeroBackground = keyof typeof heroBannerVariants.variants.background;
type HeroColumns = keyof typeof heroBannerVariants.variants.columns;

export type HeroVariantProps = {
    layout: HeroLayout;
    rounded?: HeroRounded;
    density?: HeroDensity;
    align?: HeroAlign;
    background?: HeroBackground;
    columns?: HeroColumns;
};
