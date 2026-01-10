import { tv } from "tailwind-variants";

export const switchButtonStyles = tv({
    slots: {
        root: [
            "inline-flex items-center rounded-md bg-muted p-1",
            "transition",
        ],
        button: [
            "flex items-center justify-center",
            "font-medium transition-colors",
            "focus:outline-none",
            "rounded-sm",
        ],
    },
    variants: {
        size: {
            sm: {
                button: "px-3 py-1.5 text-xs",
            },
            md: {
                button: "px-4 py-2 text-sm",
            },
        },
        active: {
            true: {
                button: "bg-white text-black",
            },
            false: {
                button: "bg-muted text-secondary-text",
            },
        },
        variant: {
            default: {},
            success: {
                button: "data-[active=true]:bg-success data-[active=true]:text-white",
            },
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});

type SwitchButtonVariant = keyof typeof switchButtonStyles.variants.variant;
type SwitchButtonSize = keyof typeof switchButtonStyles.variants.size;

export type SwitchButtonVariantProps = {
    variant?: SwitchButtonVariant;
    size?: SwitchButtonSize;
    active?: boolean;
};
