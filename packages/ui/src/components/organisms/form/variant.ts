import { tv } from "tailwind-variants";

// class="flex flex-col md:flex-row items-start gap-x-4 justify-between p-6 rounded-lg w-full bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
export const formVariants = tv({
    slots: {
        root: "rounded-lg w-full bg-white shadow-sm p-6",
        fields: "",
        actions: "",
    },
    variants: {
        layout: {
            vertical: {
                root: "w-full flex flex-col gap-4",
                fields: "flex flex-col gap-4",
                actions: "",
            },
            inline: {
                root: "flex flex-col md:flex-row md:items-start gap-4",
                fields: "flex-1 grid grid-cols-1 md:grid-cols-3 gap-4",
                actions: "md:self-end",
            },
        },
    },
    defaultVariants: {
        layout: "vertical",
    },
});

type FormLayoutVariant = keyof typeof formVariants.variants.layout;

export type FormVariantProps = {
    layout?: FormLayoutVariant;
};
