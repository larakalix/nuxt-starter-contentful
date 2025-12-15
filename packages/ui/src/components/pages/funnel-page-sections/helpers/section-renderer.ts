import type { Component } from "vue";
import {
    ContentfulType,
    type FunnelPage,
    type SectionBlogCardList,
    type SectionFooter,
    type SectionNavbar,
} from "@starter/content";
import { Navbar, Footer, BlogCardList } from "@starter/ui/organisms";
import { mapNavbarProps } from "../mappers/navbar-mapper";
import { mapFooterProps } from "../mappers/footer-mapper";
import { mapBlogCardListProps } from "../mappers/blog-card-list-mapper";
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
};

type RegistryItem = {
    component: Component;
    mapProps: (section: BaseSection) => Record<string, unknown>;
    area: SectionArea;
};

const registry: Partial<Record<ContentfulType, RegistryItem>> = {
    [ContentfulType.NAVBAR]: {
        component: Navbar,
        mapProps: (s) => mapNavbarProps(s as SectionNavbar),
        area: "header",
    },
    [ContentfulType.FOOTER]: {
        component: Footer,
        mapProps: (s) => mapFooterProps(s as SectionFooter),
        area: "footer",
    },
    [ContentfulType.BLOG_CARD_LIST]: {
        component: BlogCardList,
        mapProps: (s) => mapBlogCardListProps(s as SectionBlogCardList),
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

    if (!skipWrapper) {
        // Always render navbar and footer even if not defined in sections
        if (funnelPage.navBar) {
            const key = sectionKey(funnelPage.navBar, -1);
            const entry = registry[ContentfulType.NAVBAR];

            if (entry)
                header.push({
                    key: sectionKey(funnelPage.navBar, -1),
                    typename: funnelPage.navBar.__typename,
                    component: entry.component,
                    props: {
                        ...entry.mapProps(funnelPage.navBar),
                        onNavigate,
                    },
                });
        }

        if (funnelPage.footer) {
            const key = sectionKey(funnelPage.footer, -1);
            const entry = registry[ContentfulType.FOOTER];

            if (entry)
                footer.push({
                    key: sectionKey(funnelPage.footer, -1),
                    typename: funnelPage.footer.__typename,
                    component: entry.component,
                    props: {
                        ...entry.mapProps(funnelPage.footer),
                        onNavigate,
                    },
                });
        }
    }

    const sections = funnelPage?.template.sectionsCollection.items;

    sections.forEach((section, index) => {
        const key = sectionKey(section, index);
        const typename = section.__typename as ContentfulType | undefined;
        const entry = typename ? registry[typename] : undefined;

        const item: RenderItem = entry
            ? {
                  key,
                  typename,
                  component: entry.component,
                  props: {
                      ...entry.mapProps(section),
                      onNavigate,
                  },
              }
            : {
                  key,
                  typename: section.__typename,
                  component: unknown,
                  props: { section },
              };

        if (entry?.area === "header") header.push(item);
        else if (entry?.area === "footer") footer.push(item);
        else main.push(item);
    });

    return { header, main, footer };
}
