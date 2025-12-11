import { tv } from "tailwind-variants";

export const badgeVariants = tv({
    base: [
        "inline-flex items-center justify-center",
        "px-3 py-1",
        "text-xs font-medium",
        "whitespace-nowrap",
        "transition-colors",
    ].join(" "),
    variants: {
        variant: {
            solid: "",
            outline: "bg-transparent border",
            "primary-outline":
                "bg-primary/10 border border-primary/80 text-primary",
            soft: "bg-muted text-muted-foreground",
        },
        color: {
            default: "",
            primary: "",
            secondary: "",
            success: "",
            danger: "",
        },
        weight: {
            light: "font-light",
            normal: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            black: "font-black",
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
    },
    compoundVariants: [
        // Solid
        {
            variant: "solid",
            color: "default",
            class: "bg-secondary text-secondary-foreground",
        },
        {
            variant: "solid",
            color: "primary",
            class: "bg-primary text-primary-foreground",
        },
        {
            variant: "solid",
            color: "secondary",
            class: "bg-secondary text-secondary-foreground",
        },
        {
            variant: "solid",
            color: "success",
            class: "bg-success text-success-foreground",
        },
        {
            variant: "solid",
            color: "danger",
            class: "bg-destructive text-destructive-foreground",
        },
        // Outline
        {
            variant: "outline",
            color: "default",
            class: "border-border text-foreground/80",
        },
        {
            variant: "outline",
            color: "primary",
            class: "border-primary/60 text-primary",
        },
        {
            variant: "outline",
            color: "secondary",
            class: "border-secondary/60 text-secondary-foreground",
        },
        {
            variant: "outline",
            color: "success",
            class: "border-success/60 text-success",
        },
        {
            variant: "outline",
            color: "danger",
            class: "border-destructive/60 text-destructive",
        },
        // Soft
        {
            variant: "soft",
            color: "primary",
            class: "bg-primary/10 text-primary",
        },
        {
            variant: "soft",
            color: "secondary",
            class: "bg-secondary/20 text-secondary-foreground",
        },
        {
            variant: "soft",
            color: "success",
            class: "bg-success/10 text-success",
        },
        {
            variant: "soft",
            color: "danger",
            class: "bg-destructive/10 text-destructive",
        },
        // Primary Outline
        {
            variant: "primary-outline",
            color: "default",
            class: "bg-primary/10 border border-primary/80 text-primary",
        },
    ],
    defaultVariants: {
        variant: "solid",
        color: "primary",
        rounded: "sm",
        weight: "normal",
    },
});

type BadgeVariant = keyof typeof badgeVariants.variants.variant;
type BadgeColor = keyof typeof badgeVariants.variants.color;
type BadgeRounded = keyof typeof badgeVariants.variants.rounded;
type BadgeWeight = keyof typeof badgeVariants.variants.weight;

export type BadgeVariantsProps = {
    variant?: BadgeVariant;
    color?: BadgeColor;
    rounded?: BadgeRounded;
    class?: string;
    weight?: BadgeWeight;
};
