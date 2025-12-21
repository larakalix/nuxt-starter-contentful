import type {
    BlogCardListItem,
    BlogCardListProps,
} from "./../../..//organisms";
import type { SectionBlogCardList } from "@starter/content";
import clsx from "clsx";
import { mapBlogCardListItemProps } from "./blog-card-list-item.mapper";
import { mapSectionHeading } from "./section-heading.mapper";
import { globalStyles } from "./../../../../utils/styles.utils";

export const mapBlogCardListProps = (
    section: SectionBlogCardList,
    fromRegistry = false
): BlogCardListProps => {
    return {
        sectionHeading:
            section.sectionHeading && mapSectionHeading(section.sectionHeading),
        colSpan: section.colSpan as BlogCardListProps["colSpan"],
        layout: section.layout as BlogCardListProps["layout"],
        columns: section.columns as BlogCardListProps["columns"],
        class: fromRegistry ? clsx(globalStyles.contentPadding) : "",
        items: section.itemsCollection.items.map(
            (item) =>
                mapBlogCardListItemProps(
                    item,
                    section.layout
                ) as BlogCardListItem
        ),
    };
};
