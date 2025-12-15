import type { FunnelPage } from "@starter/content";
import type { OnNavigate } from "../../atoms";

export type FunnelPageSectionProps = {
    funnelPage: FunnelPage | null | undefined;
    onNavigate?: OnNavigate;
};
