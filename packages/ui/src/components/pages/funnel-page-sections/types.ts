import type { FunnelPage } from "@starter/content";

export type FunnelPageSectionProps = {
    funnelPage: FunnelPage | null | undefined;
    pending: boolean;
    error: Error | null | undefined;
};
