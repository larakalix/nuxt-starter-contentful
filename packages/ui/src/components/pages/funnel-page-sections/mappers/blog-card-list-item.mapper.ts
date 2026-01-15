import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { BadgeProps } from "@/src/components/atoms";
import type { BlogCardProps } from "@/src/components/molecules";
import type { BlogCardListItem } from "@starter/content/section-types";

dayjs.extend(localizedFormat);

export const mapBlogCardListItemProps = (
    section: BlogCardListItem,
    sectionLayout: string = "stacked",
    isPost: boolean = false
): BlogCardProps => {
    const layout = sectionLayout === "stacked" ? "horizontal" : "vertical";

    return {
        id: section.sys.id,
        title: section.title ?? "",
        authors:
            section.authorsCollection?.items.map((author) => ({
                id: author.sys.id,
                name: author.name,
                avatarSrc: author.avatar?.url ?? "",
                avatarAlt: author.avatar?.description ?? "",
                bio: author.bio ?? "",
                socials: [],
            })) ?? [],
        dateLabel: section.dateLabel
            ? dayjs(section.dateLabel).format("LL")
            : "",
        readTimeLabel: section.readTimeLabel ?? "",
        layout: isPost ? "post" : layout,
        excerpt: section.excerpt ?? "",
        imageSrc: section.image?.url ?? "",
        href: section.href ?? "",
        tag: section.tag
            ? {
                  id: section.tag.sys.id,
                  label: section.tag.label ?? "",
                  variant: section.tag.variant as BadgeProps["variant"],
                  rounded: section.tag.rounded as BadgeProps["rounded"],
                  weight: section.tag.weight as BadgeProps["weight"],
              }
            : undefined,
        showTocMenu: isPost ? section?.showTocMenu : false,
        bodyContent:
            isPost && section.bodyContent?.json
                ? JSON.stringify(section.bodyContent.json)
                : undefined,
    };
};
