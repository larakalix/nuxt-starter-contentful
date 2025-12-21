import { tv } from "tailwind-variants";

export const tocMenuVariants = tv({
    base: "",
    variants: {
        variant: {
            default: "",
            2: "pl-2",
            3: "pl-4",
            4: "pl-6",
            5: "pl-8",
            6: "pl-10",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type TocMenuVariant = keyof typeof tocMenuVariants["variants"]["variant"];

export type TocMenuVariantsProps = {
    variant?: TocMenuVariant;
};
