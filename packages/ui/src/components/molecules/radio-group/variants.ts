import { tv } from "tailwind-variants";

export const radioGroupVariants = tv({
    slots: {
        root: "flex flex-col gap-3",
        legend: "text-sm font-medium text-gray-900 mb-1",
        optionsRow: "flex flex-wrap gap-2",
        swatchRow: "flex flex-wrap gap-3",
    },
    variants: {
        variant: {
            list: { root: "gap-4" },
            pill: { root: "gap-2" },
            swatch: { root: "gap-2" },
        },
    },
    defaultVariants: {
        variant: "list",
    },
});

export const radioOptionVariants = tv({
    slots: {
        item: "w-full text-left",
        button: [
            "w-full flex items-start gap-3",
            "rounded-lg transition",
            "focus:outline-none focus:ring-2 focus:ring-primary/30",
        ],
        dotWrap: [
            "mt-1 flex h-4 w-4 items-center justify-center",
            "rounded-full border",
        ],
        dot: "h-2 w-2 rounded-full",
        text: "flex flex-col text-left",
        label: "text-sm font-medium text-gray-900",
        description: "text-xs text-gray-500",
        expansion: "mt-2 text-xs text-gray-500",
    },
    variants: {
        variant: {
            list: {
                button: "p-2 hover:bg-gray-50",
            },
            pill: {
                item: "w-auto",
                button: [
                    "px-4 py-2 items-center",
                    "border border-gray-300 bg-white",
                    "rounded-lg",
                    "hover:bg-gray-50",
                ],
                label: "text-sm font-medium text-gray-900",
                description: "hidden",
                text: "flex-row items-center gap-2",
                dotWrap: "mt-0",
            },
            swatch: {
                item: "w-auto",
                button: [
                    "p-0 rounded-full",
                    "focus:ring-2 focus:ring-primary/30",
                ],
                dotWrap: "hidden",
                text: "hidden",
            },
        },
        checked: {
            true: {
                dotWrap: "border-gray-900",
                dot: "bg-gray-900",
                button: "ring-0",
            },
            false: {
                dotWrap: "border-gray-300",
                dot: "bg-transparent",
            },
        },
    },
    defaultVariants: {
        variant: "list",
    },
});

export const swatchVariants = tv({
    slots: {
        swatch: [
            "h-10 w-10 rounded-full",
            "border border-white/0",
            "transition",
        ],
        ring: "ring-2 ring-primary/60 ring-offset-2 ring-offset-white",
    },
    variants: {
        checked: {
            true: { swatch: "scale-95", ring: "ring-2" },
            false: { swatch: "hover:scale-95", ring: "ring-0" },
        },
    },
});

type RadioOptionVariant = keyof typeof radioOptionVariants.variants.variant;

export type RadioOptionVariantProps = {};

export type RadioGroupVariantProps = {
    variant?: RadioOptionVariant;
};
