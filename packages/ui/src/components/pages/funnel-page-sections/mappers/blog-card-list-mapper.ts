import type { SectionBlogCardList } from "@starter/content";
import clsx from "clsx";
import { mapBlogCardListItemProps } from "./blog-card-list-item.mapper";
import { mapSectionHeading } from "./section-heading.mapper";
import type {
    BlogCardListItem,
    BlogCardListProps,
} from "@/src/components/organisms";

export const mapBlogCardListProps = (
    section: SectionBlogCardList,
    level: number = 0
): BlogCardListProps => {
    return {
        sectionHeading:
            section.sectionHeading && mapSectionHeading(section.sectionHeading),
        colSpan: section.colSpan as BlogCardListProps["colSpan"],
        layout: section.layout as BlogCardListProps["layout"],
        columns: section.columns as BlogCardListProps["columns"],
        class: level === 0 ? clsx("global-content-padding") : "",
        items: section.itemsCollection.items.map(
            (item) =>
                mapBlogCardListItemProps(
                    item,
                    section.layout
                ) as BlogCardListItem
        ),
    };
};
