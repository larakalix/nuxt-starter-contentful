import type { FunnelPage } from "@starter/content/section-types";
import type { OnNavigate } from "../../atoms/versatile-link/types";

export type FunnelPageSectionProps = {
    funnelPage: FunnelPage | null | undefined;
    onNavigate?: OnNavigate;
};
