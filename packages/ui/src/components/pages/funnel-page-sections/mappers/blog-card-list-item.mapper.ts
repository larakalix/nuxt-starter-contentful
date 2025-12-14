import type { BadgeProps } from "@/src/components/atoms";
import type { BlogCardListItem } from "@/src/components/organisms";
import type { BlogCardListItem as SectionBlogCardListItem } from "@starter/content";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const mapBlogCardListItemProps = (
    item: SectionBlogCardListItem,
    sectionLayout: string | undefined
): BlogCardListItem => {
    return {
        id: item.sys.id,
        title: item.title ?? "",
        authorAvatarSrc: item.author?.url ?? "",
        authorName: item.author?.title ?? "",
        dateLabel: item.dateLabel ? dayjs(item.dateLabel).format("LL") : "",
        readTimeLabel: item.readTimeLabel ?? "",
        layout: sectionLayout === "stacked" ? "horizontal" : "vertical",
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
    };
};
