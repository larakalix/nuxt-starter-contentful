import type { InputVariantProps } from "./variants";

export type InputProps = InputVariantProps & {
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: string;
    invalid?: boolean;
    disabled?: boolean;
    placeholder?: string;
    type?: HTMLInputElement["type"];
};
