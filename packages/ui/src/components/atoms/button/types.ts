import type { ButtonVariantsProps } from "./variants";

export type ButtonProps = ButtonVariantsProps & {
    as?: "button" | "a";
    type?: "button" | "submit" | "reset";
    class?: string;
    onClick?: VoidFunction;
};
