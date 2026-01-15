import type { Component } from "vue";
import { ContentfulType } from "@starter/content/contentful-types";
import {
    type FunnelPage,
    type SectionType,
} from "@starter/content/section-types";
import { getRegistryItem } from "./registry";
import type { OnNavigate } from "@/src/components/atoms/versatile-link";
import type { BaseSection, RenderItem } from "./types";

export function sectionKey(section: BaseSection, index: number): string {
    return (
        section.id ??
        section.sys?.id ??
        `${section.__typename ?? "section"}-${index}`
    );
}

export function buildRenderSections(
    sections: SectionType[],
    unknown: Component,
    level: number = 0,
    onNavigate?: OnNavigate
): RenderItem[] {
    return sections.map((section, index) => {
        const key = sectionKey(section, index);
        const typename = section.__typename as ContentfulType | undefined;
        const entry = getRegistryItem(typename!, level);

        if (entry) {
            return {
                key,
                typename,
                area: entry.area,
                component: entry.getComponent(),
                props: { ...entry.mapProps(section), onNavigate },
            };
        }

        return {
            key,
            typename: section.__typename,
            area: "main",
            component: unknown,
            props: { section, onNavigate },
        };
    });
}

export function buildRenderItems(
    funnelPage: FunnelPage | null | undefined,
    unknown: Component,
    level: number = 0,
    onNavigate?: OnNavigate
): {
    header: RenderItem[];
    main: RenderItem[];
    footer: RenderItem[];
} {
    let header: RenderItem[] = [];
    let footer: RenderItem[] = [];
    const main: RenderItem[] = [];

    if (!funnelPage) return { header, main, footer };

    const skipWrapper = funnelPage.skipWrapper;

    // Always render navbar and footer even if not defined in sections
    if (!skipWrapper) {
        if (funnelPage.navBar) {
            const entry = getRegistryItem(ContentfulType.NAVBAR, level);

            if (entry)
                header.push({
                    key: sectionKey(funnelPage.navBar, -1),
                    typename: funnelPage.navBar.__typename,
                    component: entry.getComponent(),
                    props: {
                        ...entry.mapProps(funnelPage.navBar),
                        onNavigate,
                    },
                    area: "header",
                });
        }

        if (funnelPage.footer) {
            const entry = getRegistryItem(ContentfulType.FOOTER, level);

            if (entry)
                footer.push({
                    key: sectionKey(funnelPage.footer, -1),
                    typename: funnelPage.footer.__typename,
                    component: entry.getComponent(),
                    props: {
                        ...entry.mapProps(funnelPage.footer),
                        onNavigate,
                    },
                    area: "footer",
                });
        }
    }

    const sections = funnelPage?.template.sectionsCollection.items;
    const items = buildRenderSections(sections, unknown, level, onNavigate);

    for (const item of items) {
        if (item.area === "header") header.push(item);
        else if (item.area === "footer") footer.push(item);
        else main.push(item);
    }

    return { header, main, footer };
}
