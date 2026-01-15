import { defineAsyncComponent } from "vue";
import { ContentfulType } from "@starter/content/contentful-types";
import type {
    SectionBlogCardList,
    SectionFooter,
    SectionGrid as SectionGridType,
    SectionNavbar,
    SectionCtaBanner,
    BlogCardListItem as BlogCardListItemType,
} from "@starter/content/section-types";
import { mapBlogCardListItemProps, mapBlogCardListProps, mapCtaBannerProps, mapFooterProps, mapNavbarProps, mapSectionGridProps } from "../mappers";
import type { RegistryItem } from "./types";

export const getRegistryItem = (
    typename: ContentfulType,
    level: number = 0
) => {
    const registry: Partial<Record<ContentfulType, RegistryItem>> = {
        [ContentfulType.NAVBAR]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../organisms/navbar/navbar.vue")),
            mapProps: (s) => mapNavbarProps(s as SectionNavbar),
            area: "header",
        },
        [ContentfulType.FOOTER]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../organisms/footer/footer.vue")),
            mapProps: (section) => mapFooterProps(section as SectionFooter),
            area: "footer",
        },
        [ContentfulType.BLOG_CARD_LIST]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../organisms/blog-card-list/blog-card-list.vue")),
            mapProps: (s) => mapBlogCardListProps(s as SectionBlogCardList, level),
            area: "main",
        },
        [ContentfulType.BLOG_CARD_LIST_ITEM]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../molecules/blog-card/blog-card.vue")),
            mapProps: (s) => mapBlogCardListItemProps(s as BlogCardListItemType, "grid", true),
            area: "main",
        },
        [ContentfulType.GRID_SECTION]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../organisms/section-grid/section-grid.vue")),
            mapProps: (s) => mapSectionGridProps(s as SectionGridType),
            area: "main",
        },
        [ContentfulType.CTA_BANNER]: {
            getComponent: () => defineAsyncComponent(() => import("./../../../molecules/cta-banner/cta-banner.vue")),
            mapProps: (s) => mapCtaBannerProps(s as SectionCtaBanner),
            area: "main",
        },
    };

    return typename ? registry[typename] : undefined;
};
