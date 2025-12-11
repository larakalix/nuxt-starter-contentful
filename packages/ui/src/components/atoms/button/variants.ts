import { tv } from "tailwind-variants";

export const buttonVariants = tv({
    base:
        "inline-flex items-center justify-center font-medium transition-colors outline-none rounded-md " +
        "focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none",
    variants: {
        variant: {
            primary:
                "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent",
            secondary:
                "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-transparent",
            outline:
                "bg-transparent border border-border text-foreground hover:bg-muted",
            ghost: "bg-transparent hover:bg-muted text-foreground",
            link: "text-primary underline-offset-4 hover:underline bg-transparent",
            success:
                "bg-success text-success-foreground hover:bg-success/90 border border-transparent",
            danger: "bg-danger text-danger-foreground hover:bg-danger/90 border border-transparent",
        },
        size: {
            sm: "text-xs px-3 py-1.5 h-8",
            md: "text-sm px-4 py-2 h-9",
            lg: "text-base px-5 py-2.5 h-11",
            xl: "text-lg px-6 py-3 h-12",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        rounded: "md",
    },
});

type ButtonVariant = keyof typeof buttonVariants.variants.variant;
type ButtonSize = keyof typeof buttonVariants.variants.size;
type ButtonRounded = keyof typeof buttonVariants.variants.rounded;

export type ButtonVariantsProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    rounded?: ButtonRounded;
    href?: string;
    disabled?: boolean;
    class?: string;
};
