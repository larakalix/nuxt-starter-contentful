import { tv } from "tailwind-variants";

export const dayVariants = tv({
    base: [
        "relative flex items-center justify-center",
        "rounded-md text-sm cursor-pointer",
        "transition",
    ],
    variants: {
        today: { true: "border border-primary" },
        selected: { true: "bg-black text-white" },
        inRange: { true: "bg-black/10" },
        disabled: { true: "text-gray-400 cursor-not-allowed" },
    },
});

export type DayVariantProps = {};
