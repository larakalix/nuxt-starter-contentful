import type { FooterProps } from "@/src/components/organisms";
import type { SectionFooter } from "@starter/content";

export const mapFooterProps = (section: SectionFooter): FooterProps => {
    return {
        brandPrimary: section.brandPrimary ?? "Note",
        brandSecondary: section.brandSecondary ?? "Blog.",
        description:
            section.description ??
            "Did you come here for something in particular or just general Riker bashing?",
        newsletterPlaceholder: section.newsletterPlaceholder ?? "Your Email",
        newsletterButtonLabel: section.newsletterButtonLabel ?? "Subscribe",
        copyright: "Designed by Show & Tell, and Developed by Ivan Lara",
        blogLinks: [
            { label: "Travel", href: "#" },
            { label: "Technology", href: "#" },
            { label: "Lifestyle", href: "#" },
            { label: "Fashion", href: "#" },
            { label: "Business", href: "#" },
        ],
        quickLinks: [
            { label: "FAQ", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Support", href: "#" },
            { label: "Privacy Policy", href: "#" },
        ],
        socialLinks: [
            { type: "facebook", href: "#" },
            { type: "twitter", href: "#" },
            { type: "instagram", href: "#" },
            { type: "linkedin", href: "#" },
        ],
    };
};
