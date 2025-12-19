import type { BadgeProps } from "./../../../atoms";
import type {
    BlogCardListItem,
    BlogCardListProps,
} from "./../../..//organisms";
import type { SectionBlogCardList } from "@starter/content";
import { mapBlogCardListItemProps } from "./blog-card-list-item.mapper";
import type { SectionHeadingProps } from "@/src/components/molecules";
import { mapSectionHeading } from "./section-heading.mapper";

export const mapBlogCardListProps = (
    section: SectionBlogCardList
): BlogCardListProps => {
    return {
        sectionHeading: section.sectionHeading && mapSectionHeading(section.sectionHeading),
        colSpan: section.colSpan as BlogCardListProps["colSpan"],
        layout: section.layout as BlogCardListProps["layout"],
        columns: section.columns as BlogCardListProps["columns"],
        items: section.itemsCollection.items.map(
            (item) =>
                mapBlogCardListItemProps(
                    item,
                    section.layout
                ) as BlogCardListItem
        ),
    };
};
