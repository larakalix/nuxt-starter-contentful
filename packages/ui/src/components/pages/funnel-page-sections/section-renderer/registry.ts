import {
    ContentfulType,
    type SectionBlogCardList,
    type SectionFooter,
    type SectionGrid as TSectionGrid,
    type SectionNavbar,
    type SectionCtaBanner,
    type SectionBlogCardListItemsCollection,
    type BlogCardListItem,
} from "@starter/content";
import { BlogCard, CtaBanner } from "@starter/ui/molecules";
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
    mapBlogCardListItemProps,
} from "../mappers";
import type { RegistryItem } from "./types";
import { mapCtaBannerProps } from "../mappers/cta-banner.mapper";

export const registry: Partial<Record<ContentfulType, RegistryItem>> = {
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
