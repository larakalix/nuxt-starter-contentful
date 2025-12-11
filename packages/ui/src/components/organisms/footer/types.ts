import type { FooterVariantsProps } from "./variants";

type FooterLink = { label: string; href: string };
type FooterSocialType = "facebook" | "twitter" | "instagram" | "linkedin";

type FooterSocial = {
    type: FooterSocialType;
    href: string;
    label?: string;
};

export type FooterProps = FooterVariantsProps & {
    brandPrimary?: string;
    brandSecondary?: string;
    description?: string;
    blogLinks?: FooterLink[];
    quickLinks?: FooterLink[];
    socialLinks?: FooterSocial[];
    newsletterPlaceholder?: string;
    newsletterButtonLabel?: string;
    copyright?: string;
};
