import {
    ContentfulType,
    type SectionBlogCardList,
    type SectionFooter,
    type SectionGrid as TSectionGrid,
    type SectionNavbar,
    type SectionCtaBanner,
    type BlogCardListItem,
} from "@starter/content";
import { CtaBanner } from "@starter/ui/molecules/cta-banner";
import { BlogCard } from "@starter/ui/molecules/blog-card";
import { Navbar } from "@starter/ui/organisms/navbar";
import { Footer } from "@starter/ui/organisms/footer";
import { BlogCardList } from "@starter/ui/organisms/blog-card-list";
import { SectionGrid } from "@starter/ui/organisms/section-grid";

import {
    mapBlogCardListProps,
    mapNavbarProps,
    mapFooterProps,
    mapSectionGridProps,
    mapBlogCardListItemProps,
} from "../mappers";
import { mapCtaBannerProps } from "../mappers/cta-banner.mapper";
import type { RegistryItem } from "./types";

export const getRegistryItem = (
    typename: ContentfulType,
    level: number = 0
) => {
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
            mapProps: (s) =>
                mapBlogCardListProps(s as SectionBlogCardList, level),
            area: "main",
        },
        [ContentfulType.BLOG_CARD_LIST_ITEM]: {
            getComponent: () => BlogCard,
            mapProps: (s) =>
                mapBlogCardListItemProps(s as BlogCardListItem, "grid", true),
            area: "main",
        },
        [ContentfulType.GRID_SECTION]: {
            getComponent: () => SectionGrid,
            mapProps: (s) => mapSectionGridProps(s as TSectionGrid),
            area: "main",
        },
        [ContentfulType.CTA_BANNER]: {
            getComponent: () => CtaBanner,
            mapProps: (s) => mapCtaBannerProps(s as SectionCtaBanner),
            area: "main",
        },
    };

    return typename ? registry[typename] : undefined;
};
