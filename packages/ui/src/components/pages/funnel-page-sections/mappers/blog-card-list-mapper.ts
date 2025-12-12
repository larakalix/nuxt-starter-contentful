import type { BadgeProps } from "@/src/components/atoms";
import type { BlogCardVariantsProps } from "@/src/components/molecules";
import type { BlogCardListProps } from "@/src/components/organisms";
import type { SectionBlogCardList } from "@starter/content";

export const mapBlogCardListProps = (
    section: SectionBlogCardList
): BlogCardListProps => {
    return {
        sectionHeading: {
            title: section.heading?.title ?? "",
            label: section.heading?.label ?? "",
            tag: {
                id: section.heading?.tag?.id ?? "",
                variant: section.heading?.tag?.variant as BadgeProps["variant"],
                rounded: section.heading?.tag?.rounded as BadgeProps["rounded"],
                weight: section.heading?.tag?.weight as BadgeProps["weight"],
            },
        },
        layout: section.layout as BlogCardListProps["layout"],
        columns: section.columns as BlogCardListProps["columns"],
        items: section.items.map((item) => ({
            id: item.id,
            title: item.title ?? "",
            authorAvatarSrc: item.author?.url ?? "",
            authorName: item.author?.title ?? "",
            dateLabel: item.dateLabel ?? "",
            readTimeLabel: item.readTimeLabel ?? "",
            excerpt: item.excerpt ?? "",
            imageSrc: item.image?.url ?? "",
            href: item.href ?? "",
            tag: item.tag
                ? {
                      id: item.tag.id,
                      label: item.tag.label ?? "",
                      variant: item.tag.variant as BadgeProps["variant"],
                      rounded: item.tag.rounded as BadgeProps["rounded"],
                      weight: item.tag.weight as BadgeProps["weight"],
                  }
                : undefined,
        })),
    };
};
