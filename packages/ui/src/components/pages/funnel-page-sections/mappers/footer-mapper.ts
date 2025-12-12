import type { FooterProps } from "./../../../organisms/footer";
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
