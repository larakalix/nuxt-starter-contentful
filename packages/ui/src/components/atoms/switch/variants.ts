import { tv } from "tailwind-variants";

export const switchStyles = tv({
    slots: {
        root: [
            "relative inline-flex shrink-0 cursor-pointer items-center",
            "relative inline-flex shrink-0 cursor-pointer items-center",
            "rounded-full border border-border transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
        ],
        thumb: [
            "inline-block rounded-full bg-white shadow",
            "transition-transform",
        ],
        label: ["text-sm font-medium"],
    },
    variants: {
        size: {
            sm: {
                root: "h-5 w-9",
                thumb: "h-4 w-4",
            },
            md: {
                root: "h-6 w-11",
                thumb: "h-5 w-5",
            },
        },
        checked: {
            true: {
                root: "bg-primary border-primary",
                thumb: "translate-x-full",
            },
            false: {
                root: "bg-transparent border-border",
                thumb: "translate-x-0",
            },
        },
        variant: {
            default: {},
            success: {
                root: "data-[checked=true]:bg-success data-[checked=true]:border-success",
            },
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});

type SwitchVariants = keyof typeof switchStyles.variants.variant;
type SwitchSize = keyof typeof switchStyles.variants.size;

export type SwitchVariantProps = {
    variant?: SwitchVariants;
    size?: SwitchSize;
};
