import type { Component } from "vue";
import {
    ContentfulType,
    type SectionBlogCardList,
    type SectionFooter,
    type SectionNavbar,
} from "@starter/content";
import { Navbar, Footer, BlogCardList } from "@starter/ui/organisms";
import { mapNavbarProps } from "../mappers/navbar-mapper";
import { mapFooterProps } from "../mappers/footer-mapper";
import { mapBlogCardListProps } from "../mappers/blog-card-list-mapper";

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
    area: "header" | "main" | "footer";
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
    sections: BaseSection[],
    unknown: Component
): {
    header: RenderItem | null;
    main: RenderItem[];
    footer: RenderItem | null;
} {
    let header: RenderItem | null = null;
    let footer: RenderItem | null = null;
    const main: RenderItem[] = [];

    sections.forEach((section, index) => {
        const key = sectionKey(section, index);
        const typename = section.__typename as ContentfulType | undefined;
        const entry = typename ? registry[typename] : undefined;

        const item: RenderItem = entry
            ? {
                  key,
                  typename,
                  component: entry.component,
                  props: entry.mapProps(section),
              }
            : {
                  key,
                  typename: section.__typename,
                  component: unknown,
                  props: { section },
              };

        if (entry?.area === "header") header = item;
        else if (entry?.area === "footer") footer = item;
        else main.push(item);
    });

    return { header, main, footer };
}
