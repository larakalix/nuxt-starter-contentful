import type { ButtonVariantsProps } from "./variants";

export type ButtonProps = ButtonVariantsProps & {
    id?: string;
    as?: "button" | "a";
    type?: "button" | "submit" | "reset";
    class?: string;
    onClick?: VoidFunction;
};
