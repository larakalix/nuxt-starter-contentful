import type { OnNavigate } from "../../atoms";
import type { NavbarVariantsProps } from "./variant";

export type NavItem = {
    label: string;
    href: string;
};

export type NavbarProps = NavbarVariantsProps & {
    items?: NavItem[];
    sticky?: boolean;
    showBorder?: boolean;
    /**
     * Optional primary CTA on the right side:
     * e.g. "Sign in", "Subscribe", "Add product"
     */
    ctaLabel?: string;
    ctaHref?: string;
    user?: { name: string } | null;
    onNavigate?: OnNavigate;
};
