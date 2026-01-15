import type { NavbarProps } from "@/src/components/organisms/navbar";
import type { SectionNavbar } from "@starter/content/section-types";

export const mapNavbarProps = (section: SectionNavbar): NavbarProps => {
    return {
        showBorder: section.showBorder ?? false,
        sticky: section.sticky ?? false,
        variant: (section.variant as NavbarProps["variant"]) ?? "secondary",
        items: section.linksCollection.items
            ? [{ label: "Home", href: "/" }, ...section.linksCollection.items]
            : [],
        // user: {
        //     name: "Jurgen Klopp",
        // },
    } satisfies NavbarProps;
};
