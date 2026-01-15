import type { OnNavigate } from "../../atoms/versatile-link/types";
import type { NavbarVariantsProps } from "./variant";

export type NavItem = {
    label: string;
    href: string;
    highlight?: boolean;
};

export type NavbarProps = NavbarVariantsProps & {
    items?: NavItem[];
    sticky?: boolean;
    showBorder?: boolean;
    brandPrimary?: string;
    brandSecondary?: string;
    /**
     * Optional primary CTA on the right side:
     * e.g. "Sign in", "Subscribe", "Add product"
     */
    ctaLabel?: string;
    ctaHref?: string;
    user?: { name: string } | null;
    onNavigate?: OnNavigate;
};
