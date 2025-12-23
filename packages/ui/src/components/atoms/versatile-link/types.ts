export type OnNavigate = (
    href: string,
    event?: MouseEvent
) => void | Promise<void>;

export type To = string | Record<string, any>;

export type VersatileLinkProps = {
    to?: To;
    href?: string;
    external?: boolean;
    replace?: boolean;
    prefetch?: boolean;
    target?: string;
    rel?: string;
    ariaLabel?: string;
    disabled?: boolean;
    class?: string;
    onNavigate?: OnNavigate;
};
