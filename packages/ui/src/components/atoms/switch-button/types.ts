import type { SwitchButtonVariantProps } from "./variants";

export type SwitchButtonProps = SwitchButtonVariantProps & {
    modelValue: boolean;
    onLabel?: string;
    offLabel?: string;
    disabled?: boolean;
    class?: string;
};
