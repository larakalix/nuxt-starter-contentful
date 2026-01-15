import type { SectionForm } from "@starter/content/section-types";

export type FormRendererProps = {
    form: SectionForm;
    class?: string;
    onSubmit?: (data: Record<string, any>) => void;
};
