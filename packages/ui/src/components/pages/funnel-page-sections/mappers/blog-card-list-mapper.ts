import type { BadgeProps } from "./../../../atoms";
import type { BlogCardListProps } from "./../../..//organisms";
import type { SectionBlogCardList } from "@starter/content";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const mapBlogCardListProps = (
    section: SectionBlogCardList
): BlogCardListProps => {
    return {
        sectionHeading: {
            title: section.sectionHeading?.title ?? "",
            label: section.sectionHeading?.label ?? "",
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
        layout: section.layout as BlogCardListProps["layout"],
        columns: section.columns as BlogCardListProps["columns"],
        items: section.itemsCollection.items.map((item) => ({
            id: item.sys.id,
            title: item.title ?? "",
            authorAvatarSrc: item.author?.url ?? "",
            authorName: item.author?.title ?? "",
            dateLabel: item.dateLabel ? dayjs(item.dateLabel).format("LL") : "",
            readTimeLabel: item.readTimeLabel ?? "",
            excerpt: item.excerpt ?? "",
            imageSrc: item.image?.url ?? "",
            href: item.href ?? "",
            tag: item.tag
                ? {
                      id: item.tag.sys.id,
                      label: item.tag.label ?? "",
                      variant: item.tag.variant as BadgeProps["variant"],
                      rounded: item.tag.rounded as BadgeProps["rounded"],
                      weight: item.tag.weight as BadgeProps["weight"],
                  }
                : undefined,
        })),
    };
};
