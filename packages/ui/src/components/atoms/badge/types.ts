import type { BadgeVariantsProps } from "./variants";

export type BadgeProps = BadgeVariantsProps & {
    id?: string;
    as?: string;
    class?: string;
    label: string;
};
