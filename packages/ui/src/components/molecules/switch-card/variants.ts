import { tv } from "tailwind-variants";

export const switchCardStyles = tv({
    slots: {
        root: [
            "flex items-center justify-between gap-4",
            "rounded-xl border border-primary",
            "bg-muted p-4 transition",
            "hover:ring-2 hover:ring-primary/40",
        ],
        left: ["flex items-start gap-3"],
        icon: ["flex size-10 px-2.5 items-center justify-center", "rounded-full"],
        text: ["flex flex-col"],
        label: ["text-sm font-medium text-primary"],
        subLabel: ["text-xs text-muted-text"],
        description: ["mt-1 text-xs text-muted-subtitle-text"],
    },
    variants: {
        variant: {
            default: {
                icon: "bg-red-500/20 text-red-500",
            },
            success: {
                icon: "bg-secondary text-primary",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type SwitchCardVariant = keyof typeof switchCardStyles.variants.variant;

export type SwitchCardVariantProps = {
    variant?: SwitchCardVariant;
};
