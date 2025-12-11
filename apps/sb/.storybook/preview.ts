import type { Decorator, Preview } from "@storybook/vue3-vite";
import { THEMES } from "@starter/ui/constants";
import "@starter/tailwind-config/tailwindcss";

type ThemeKey = keyof typeof THEMES;

const themeToolbarItems = Object.entries(THEMES).map(([value, data]) => ({
    value,
    title: data.title,
}));

const THEME_CLASSES = Object.values(THEMES).map((t) => t.className);

const withTheme: Decorator = (Story, { globals }) => {
    if (typeof document !== "undefined") {
        const root = document.documentElement;
        const raw = globals.theme as ThemeKey | undefined;
        const themeKey: ThemeKey = raw && raw in THEMES ? raw : "default";
        const themeClass = THEMES[themeKey].className;

        root.classList.remove(...THEME_CLASSES, "dark");

        root.classList.add(themeClass);

        if (globals.colorMode === "dark") {
            root.classList.add("dark");
        }
    }

    return Story();
};

const preview: Preview = {
    parameters: {
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
    globalTypes: {
        theme: {
            name: "Theme",
            description: "UI Theme",
            defaultValue: "default",
            toolbar: {
                icon: "paintbrush",
                items: themeToolbarItems,
            },
        },
        colorMode: {
            name: "Mode",
            description: "Light / Dark mode",
            defaultValue: "light",
            toolbar: {
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
            },
        },
    },
    decorators: [withTheme],
};

export default preview;
