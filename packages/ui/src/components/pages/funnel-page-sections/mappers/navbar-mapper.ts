import type { NavbarProps } from "./../../../organisms/navbar";
import type { SectionNavbar } from "@starter/content";

export const mapNavbarProps = (section: SectionNavbar): NavbarProps => {
    return {
        showBorder: section.showBorder ?? false,
        sticky: section.sticky ?? false,
        variant: section.variant as NavbarProps["variant"] ?? "secondary",
        items: section.items ?? [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ],
        // user: {
        //     name: "Jurgen Klopp",
        // },
    } satisfies NavbarProps;
};
