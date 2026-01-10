import type { TextareaVariantProps } from "./variants";

export type TextareaProps = TextareaVariantProps & {
    modelValue: string;
    placeholder?: string;
    hint?: string;
    maxLength?: number;
    disabled?: boolean;
    invalid?: boolean;
    class?: string;
};
