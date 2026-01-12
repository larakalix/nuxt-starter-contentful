import type { SelectVariantProps } from "./variants";

export type SelectOption = {
    label: string;
    value: string;
};

export type SelectProps = SelectVariantProps & {
    modelValue?: string;
    options: SelectOption[];
    placeholder?: string;
    helper?: string;
    searchable?: boolean;
    disabled?: boolean;
};
