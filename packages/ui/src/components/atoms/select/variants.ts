import { tv } from "tailwind-variants";

export const selectVariants = tv({
    slots: {
        root: "relative w-full max-w-sm",
        trigger: [
            "w-full flex items-center justify-between",
            "rounded-md border border-border px-3 py-2 text-sm",
            "transition",
            "focus:outline-none focus:ring-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ],
        dropdown: [
            "absolute z-50 mt-1 w-full",
            "rounded-md border border-border bg-white shadow-lg",
            "overflow-hidden",
        ],
        option: ["px-3 py-2 cursor-pointer", "transition"],
        helper: "mt-1 text-xs text-gray-500",
        search: [
            "w-full px-2 py-1 text-sm",
            "rounded-md border border-border",
            "focus:outline-none focus:ring-1",
        ],
    },
    variants: {
        variant: {
            default: {
                trigger: "border-border bg-white focus:ring-primary/40",
                option: "hover:bg-gray-100",
            },
            ghost: {
                trigger: "border-transparent bg-gray-50 focus:ring-primary/30",
                option: "hover:bg-gray-50",
            },
        },
        selected: {
            true: {
                option: "bg-gray-100 font-medium",
            },
        },
        active: {
            true: {
                option: "bg-primary/10",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type SelectVariant = keyof typeof selectVariants.variants.variant;

export type SelectVariantProps = {
    variant?: SelectVariant;
};
