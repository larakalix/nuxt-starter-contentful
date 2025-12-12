import type { NavbarProps } from "./../../../organisms/navbar";
import type { SectionNavbar } from "@starter/content";

export const mapNavbarProps = (section: SectionNavbar): NavbarProps => {
    return {
        variant: section.variant as NavbarProps["variant"],
        items: section.items,
        // user: {
        //     name: "Jurgen Klopp",
        // },
    } satisfies NavbarProps;
};
