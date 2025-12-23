import type { NavbarProps } from "./../../../organisms/navbar";
import type { SectionNavbar } from "@starter/content";

export const mapNavbarProps = (section: SectionNavbar): NavbarProps => {
    console.log("Mapping Navbar Section:", section.linksCollection.items);
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
