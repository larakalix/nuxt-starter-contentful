import type { ComputedRef } from "vue";
import type {
    RadioGroupVariantProps,
    RadioOptionVariantProps,
} from "./variants";

export type RadioGroupContext = {
    modelValue: ComputedRef<string | number>;
    setValue: (v: string | number) => void;
    variant: RadioGroupVariantProps["variant"];
    name?: string;
    disabled?: boolean;
};

export type RadioGroupProps = RadioGroupVariantProps & {
    modelValue: string | number;
    name?: string;
    legend?: string;
    disabled?: boolean;
};

export type RadioOptionProps = RadioOptionVariantProps & {
    value: string | number;
    label: string;
    description?: string;
    disabled?: boolean;
};

export type RadioSwatchProps = {
    value: string | number;
    colorClass: string;
    ariaLabel: string;
    disabled?: boolean;
};