import type { FunnelPage } from "@starter/content/section-types";

export const injectTheme = (theme: FunnelPage["theme"] | null | undefined) => {
    if (!theme || typeof document === "undefined") return;

    // inject theme class to document body
    // ex: "theme-green" or "theme-default"
    const themeClass = theme;
    const root = document.documentElement;

    if (!root) return;

    const _theme = !themeClass.startsWith("theme-")
        ? `theme-${themeClass}`
        : themeClass;

    root.classList.add(themeClass);

    // cache theme in local storage
    try {
        localStorage.setItem("theme", _theme);
    } catch (_) {
        // ignore localStorage errors
    }

    return;
};
