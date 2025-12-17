import type { Component } from "vue";
import {
    ContentfulType,
    type FunnelPage,
    type SectionBlogCardList,
    type SectionFooter,
    type SectionGrid as TSectionGrid,
    type SectionNavbar,
    type SectionType,
} from "@starter/content";
import {
    Navbar,
    Footer,
    BlogCardList,
    SectionGrid,
} from "@starter/ui/organisms";
import {
    mapBlogCardListProps,
    mapNavbarProps,
    mapFooterProps,
    mapSectionGridProps,
} from "../mappers";
import type { OnNavigate } from "@/src/components/atoms";

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

type RegistryItem = {
    getComponent: () => Component;
    mapProps: (section: BaseSection) => Record<string, unknown>;
    area: SectionArea;
};

const registry: Partial<Record<ContentfulType, RegistryItem>> = {
    [ContentfulType.NAVBAR]: {
        getComponent: () => Navbar,
        mapProps: (s) => mapNavbarProps(s as SectionNavbar),
        area: "header",
    },
    [ContentfulType.FOOTER]: {
        getComponent: () => Footer,
        mapProps: (s) => mapFooterProps(s as SectionFooter),
        area: "footer",
    },
    [ContentfulType.BLOG_CARD_LIST]: {
        getComponent: () => BlogCardList,
        mapProps: (s) => mapBlogCardListProps(s as SectionBlogCardList),
        area: "main",
    },
    [ContentfulType.GRID_SECTION]: {
        getComponent: () => SectionGrid,
        mapProps: (s) => mapSectionGridProps(s as TSectionGrid),
        area: "main",
    },
};

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
    onNavigate?: OnNavigate
): RenderItem[] {
    return sections.map((section, index) => {
        const key = sectionKey(section, index);
        const typename = section.__typename as ContentfulType | undefined;
        const entry = typename ? registry[typename] : undefined;

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
            const key = sectionKey(funnelPage.navBar, -1);
            const entry = registry[ContentfulType.NAVBAR];

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
            const key = sectionKey(funnelPage.footer, -1);
            const entry = registry[ContentfulType.FOOTER];

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
    const items = buildRenderSections(sections, unknown, onNavigate);

    for (const item of items) {
        if (item.area === "header") header.push(item);
        else if (item.area === "footer") footer.push(item);
        else main.push(item);
    }

    return { header, main, footer };
}
