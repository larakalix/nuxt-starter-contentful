import { tv } from "tailwind-variants";

export const inputVariants = tv({
    base: [
        "flex w-full min-w-0 border bg-transparent px-3 py-1 text-sm outline-none",
        "placeholder-placeholder",
        "transition-[color,box-shadow,border-color]",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:ring-2 focus-visible:ring-offset-0",
    ],
    variants: {
        variant: {
            default: ["border-input"],
            outline: ["border-border"],
            ghost: ["border-transparent", "bg-muted/40"],
            error: ["border-danger"],
        },
        focus: {
            default: "focus-visible:border-primary focus-visible:ring-2 hover:ring-3 focus-visible:ring-primary/30 hover:ring-primary/20",
            error: "focus-visible:border-danger focus-visible:ring-2 hover:ring-3 focus-visible:ring-danger/30 hover:ring-danger/20",
            none: "",
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
    },
    defaultVariants: {
        variant: "default",
        focus: "default",
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
