import type { FooterProps } from "@/src/components/organisms";
import type { SectionFooter } from "@starter/content";

export const mapFooterProps = (section: SectionFooter): FooterProps => {
    return {
        brandPrimary: section.brandPrimary,
        brandSecondary: section.brandSecondary,
        description: section.description,
        blogLinks: section.blogLinks,
        quickLinks: section.quickLinks,
        socialLinks: section.socialLinks,
        newsletterPlaceholder: section.newsletterPlaceholder,
        newsletterButtonLabel: section.newsletterButtonLabel,
    };
};
