import type { SwitchVariantProps } from "./variants";

export type SwitchProps = SwitchVariantProps & {
    modelValue: boolean;
    label?: string;
    description?: string;
    disabled?: boolean;
    class?: string;
};
