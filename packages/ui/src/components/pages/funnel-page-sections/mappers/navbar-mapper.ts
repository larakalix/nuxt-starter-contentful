import type { NavbarProps } from "@/src/components/organisms";
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
