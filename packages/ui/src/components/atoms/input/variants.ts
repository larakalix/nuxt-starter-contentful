import { tv } from "tailwind-variants";

export const inputVariants = tv({
    base: [
        "flex w-full min-w-0 border bg-transparent px-3 py-1 text-sm outline-none",
        "placeholder-placeholder",
        "transition-[color,box-shadow,border-color]",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:ring-2 focus-visible:ring-offset-0",
    ],
    variants: {
        variant: {
            default: [
                "border-input",
                "focus-visible:border-primary",
                "focus-visible:ring-primary/30",
            ],
            outline: [
                "border-border",
                "focus-visible:border-primary",
                "focus-visible:ring-primary/30",
            ],
            ghost: [
                "border-transparent",
                "bg-muted/40",
                "focus-visible:border-primary",
                "focus-visible:ring-primary/20",
            ],
            error: [
                "border-danger",
                "focus-visible:border-danger",
                "focus-visible:ring-danger/30",
            ],
        },
        size: {
            sm: "h-8 text-xs px-2",
            md: "h-9 text-sm px-3",
            lg: "h-11 text-base px-4",
        },
        rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        },
        invalid: {
            true: "border-danger ring-danger/30",
            false: "",
        },
        disabled: {
            true: "cursor-not-allowed opacity-50",
            false: "",
        },
    },

    defaultVariants: {
        variant: "default",
        size: "md",
        rounded: "md",
    },
});

type InputVariant = keyof typeof inputVariants.variants.variant;

type InputSize = keyof typeof inputVariants.variants.size;

type InputRounded = keyof typeof inputVariants.variants.rounded;

export type InputVariantProps = {
    variant?: InputVariant;
    size?: InputSize;
    rounded?: InputRounded;
};
