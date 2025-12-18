import type { BadgeProps } from "./../../../atoms";
import type {
    BlogCardListItem,
    BlogCardListProps,
} from "./../../..//organisms";
import type { SectionBlogCardList } from "@starter/content";
import { mapBlogCardListItemProps } from "./blog-card-list-item.mapper";
import type { SectionHeadingProps } from "@/src/components/molecules";

export const mapBlogCardListProps = (
    section: SectionBlogCardList
): BlogCardListProps => {
    return {
        sectionHeading: {
            title: section.sectionHeading?.title ?? "",
            label: section.sectionHeading?.label ?? "",
            colSpan: section.sectionHeading?.colSpan as SectionHeadingProps["colSpan"],
            tag: {
                id: section.sectionHeading?.tag?.sys.id ?? "",
                variant: section.sectionHeading?.tag
                    ?.variant as BadgeProps["variant"],
                rounded: section.sectionHeading?.tag
                    ?.rounded as BadgeProps["rounded"],
                weight: section.sectionHeading?.tag
                    ?.weight as BadgeProps["weight"],
            },
        },
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
