import type { SectionForm } from "@starter/content";

export type FormRendererProps = {
    form: SectionForm;
    class?: string;
    onSubmit?: (data: Record<string, any>) => void;
};
