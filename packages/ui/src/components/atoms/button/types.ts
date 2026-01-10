import type { ButtonVariantsProps } from "./variants";

export type ButtonProps = ButtonVariantsProps & {
    label?: string;
    ariaLabel?: string;
    id?: string;
    as?: "button" | "a" | "versatile-link";
    type?: "button" | "submit" | "reset";
    class?: string;
    onClick?: VoidFunction;
};
