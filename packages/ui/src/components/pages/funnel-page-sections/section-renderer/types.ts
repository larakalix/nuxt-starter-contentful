import type { Component } from "vue";

export type RegistryItem = {
    getComponent: () => Component;
    mapProps: (section: BaseSection) => Record<string, unknown>;
    area: SectionArea;
};

export type SectionArea = "header" | "main" | "footer";

export type BaseSection = {
    __typename?: string;
    id?: string | null;
    sys?: { id?: string | null } | null;
};

export type RenderItem = {
    key: string;
    component: Component;
    props: Record<string, unknown>;
    typename?: string;
    area: SectionArea;
};
