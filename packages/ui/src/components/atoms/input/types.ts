import type { InputVariantProps } from "./variants";

export type InputProps = InputVariantProps & {
    modelValue?: string | number;
    name?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    class?: string;
};
