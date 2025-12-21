import type { AuthorCardProps } from "../author-card";
import type { AuthorBadgeVariantProps } from "./variants";

export type AuthorBadgeProps = AuthorBadgeVariantProps & {
    author?: AuthorCardProps | undefined;
    showTooltip?: boolean;
    isFirst?: boolean;
    class?: string;
    style?: Record<string, string>;
};
