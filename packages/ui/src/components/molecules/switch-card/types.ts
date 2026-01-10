import type { SwitchCardVariantProps } from "./variants";

export type SwitchCardProps = SwitchCardVariantProps & {
    modelValue: boolean;
    label: string;
    subLabel?: string;
    description?: string;
    icon?: "payment" | "energy";
    variant?: "default" | "success";
    disabled?: boolean;
};
