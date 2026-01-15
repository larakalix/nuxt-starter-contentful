import type { NavbarProps } from "@starter/ui/organisms/navbar";
import type { FooterProps } from "@starter/ui/organisms/footer";
import type { Ref } from "vue";

export type ShellState = {
    enabled: boolean;
    navBar?: NavbarProps | undefined;
    footer?: FooterProps | undefined;
};

export function useShellState(): Ref<ShellState> {
    return useState<ShellState>("shell", () => ({
        enabled: true,
        navBar: undefined,
        footer: undefined,
    }));
}
